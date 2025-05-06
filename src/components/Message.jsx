import { useState } from 'react'
import { media } from '../media'
import { Button } from './Button'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px 8px;
  width: 300px;
  height: auto;
  background-color: #fff;
  border: 2px solid black;
  box-shadow: 6px 6px 0 0 black;
  margin: 2rem auto;
  font-size: 14px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  overflow: auto;

  animation: ${(props) => (props.$isNew ? fadeIn : 'none')} 0.5s ease-out;

  @media ${media.tablet} {
    width: 400px;
  }
  @media ${media.desktop} {
    width: 500px;
  }
`
export const MessageText = styled.p`
  width: 100%;
  height: auto;
`

export const BottomSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  color: #333;
  font-size: 12px;
`

export const Message = ({ id, message, isNew = false, hearts }) => {
  // Track if the current user has liked this post (persisted via localStorage)
  const [isLiked, setIsLiked] = useState(() => {
    // Check localStorage on component mount to see if user previously liked this post
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')
    return likedPosts.includes(id)
  })

  // Track the total like count, starting with the hearts from API
  const [likeCount, setLikeCount] = useState(hearts)
  // const [createdAtState, setCreatedAtState] = useState(createdAt)

  // Update localStorage when like status changes
  const updateLocalStorage = (liked) => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]')

    if (liked) {
      if (!likedPosts.includes(id)) {
        localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, id]))
        window.dispatchEvent(new Event('localStorageUpdated')) // This is crucial
      }
    } else {
      const updatedLikes = likedPosts.filter((postId) => postId !== id)
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikes))
      window.dispatchEvent(new Event('localStorageUpdated')) // This is crucial
    }
  }

  const handleLike = () => {
    console.log('Like button clicked', { id, isLiked })

    // Toggle liked state
    const newLikedState = !isLiked

    // Update state optimistically
    setIsLiked(newLikedState)

    // Update like count based on new state
    if (newLikedState) {
      setLikeCount((prevCount) => prevCount + 1)
    } else {
      setLikeCount((prevCount) => prevCount - 1)
    }

    // Update localStorage
    updateLocalStorage(newLikedState)

    // Always use the same endpoint
    const endpoint = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`

    // CHANGE: Always use POST but with different action
    const method = 'POST'

    // Add action type based on state
    const body = newLikedState
      ? JSON.stringify({ thoughtId: id })
      : JSON.stringify({ thoughtId: id, action: 'unlike' })

    console.log(`Sending ${method} request to ${endpoint} with body:`, body)

    fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body
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

        // ONLY revert UI changes on error
        setIsLiked(!newLikedState)
        if (newLikedState) {
          setLikeCount((prevCount) => prevCount - 1)
        } else {
          setLikeCount((prevCount) => prevCount + 1)
        }
      })
  }

  return (
    <MessageContainer $isNew={isNew}>
      <MessageText>{message}</MessageText>
      <BottomSection>
        <div className='likeSection'></div>
        <Button
          variant='icon'
          icon={'❤️'}
          onClick={handleLike}
          isLiked={isLiked}
        />
        <p>{`x ${likeCount}`}</p>
      </BottomSection>
    </MessageContainer>
  )
}
