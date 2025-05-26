import { useState } from 'react'

export const useLikeSystem = (thoughtId, initialHearts) => {
  // Track the total like count, starting with the hearts from API
  const [likeCount, setLikeCount] = useState(initialHearts)
  // Track if the current user has liked this post (persisted via localStorage)
  const [isLiked, setIsLiked] = useState(() => {
    // Check localStorage on component mount to see if user previously liked this post
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
    return likedPosts.includes(thoughtId)
  })

  // Update localStorage when like status changes
  const updateLocalStorage = (liked) => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')

    if (liked) {
      if (!likedPosts.includes(thoughtId)) {
        localStorage.setItem(
          'likedPosts',
          JSON.stringify([...likedPosts, thoughtId])
        )
        window.dispatchEvent(new Event('localStorageUpdated')) // This is crucial
      }
    } else {
      const updatedLikes = likedPosts.filter((postId) => postId !== thoughtId)
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikes))
      window.dispatchEvent(new Event('localStorageUpdated')) // This is crucial
    }
  }

  const handleLike = () => {
    // If already liked, don't make API call, just update UI
    if (isLiked) {
      setIsLiked(false)
      setLikeCount((prevCount) => prevCount - 1)
      updateLocalStorage(false)
      return // Don't make API call for unlikes since API doesn't support it
    }

    // For likes, update UI optimistically and make API call
    setIsLiked(true)
    setLikeCount((prevCount) => prevCount + 1)
    updateLocalStorage(true)

    // Make API call for likes
    const endpoint = `https://happy-thoughts-api-4ful.onrender.com/${thoughtId}/like`

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ thoughtId: thoughtId })
    })
      .then((response) => {
        console.log('Response status:', response.status)
        return response.json().catch(() => ({}))
      })
      .then((data) => {
        console.log('Response data:', data)
        // Update like count with the server's value
        if (data && typeof data.hearts === 'number') {
          setLikeCount(data.hearts)
        }
      })
      .catch((error) => {
        console.error('Error updating like status:', error)

        // Revert UI changes on error
        setIsLiked(false)
        setLikeCount((prevCount) => prevCount - 1)
        updateLocalStorage(false)
      })
  }

  return {
    isLiked,
    likeCount,
    handleLike
  }
}
