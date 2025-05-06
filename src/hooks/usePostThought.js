import { useState } from 'react'

export const usePostThought = (onSuccess) => {
  const [message, setMessage] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState(null)

  // Character limit for thoughts (adjust as needed)
  const MAX_CHARS = 140

  // Calculate remaining characters
  const remainingChars = MAX_CHARS - message.length

  // Handle input change
  const handleInputChange = (e) => {
    setMessage(e.target.value)
    // Clear any previous errors when the user types
    if (error) setError(null)
  }

  // Post the thought to the API
  const postThought = async () => {
    // Don't post if exceeding character limit or empty message
    if (remainingChars < 0 || message.trim() === '') {
      setError(
        remainingChars < 0
          ? 'Your message exceeds the character limit'
          : 'Please enter a message'
      )
      return false
    }

    setIsPosting(true)
    setError(null)

    try {
      const response = await fetch(
        'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to post thought')
      }

      // Clear the form after successful submission
      setMessage('')

      // Call the success callback with the new thought data
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(data)
      }

      return true
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      return false
    } finally {
      setIsPosting(false)
    }
  }

  // Submit handler for forms
  const handleSubmit = (e) => {
    e.preventDefault()
    return postThought()
  }

  return {
    message,
    setMessage,
    isPosting,
    error,
    remainingChars,
    handleInputChange,
    postThought,
    handleSubmit
  }
}
