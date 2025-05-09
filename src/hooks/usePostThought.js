import { useState } from 'react'
import { api } from '../api/api'

export const usePostThought = (onSuccess, postThoughtFn) => {
  const [message, setMessage] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState(null)

  // Character limit for thoughts (adjust as needed)
  const MIN_CHARS = 5
  const MAX_CHARS = 140
  const remainingChars = MAX_CHARS - message.length

  // Handle input change
  const handleInputChange = (e) => {
    setMessage(e.target.value)
    // Clear any previous errors when the user types
    if (error) setError(null)
  }

  // Post the thought to the API
  const postThought = async () => {
    // Don't post if exceeding character limit or less than 5 chars
    if (remainingChars < 0 || message.trim().length < MIN_CHARS) {
      setError(
        remainingChars < 0
          ? 'Your message exceeds the character limit'
          : message.trim().length === 0
          ? 'Please enter a message'
          : 'Your message is too short'
      )
      return false
    }

    setIsPosting(true)
    setError(null)

    try {
      // Use the provided postThoughtFn if available, otherwise fall back to API
      const postFn = postThoughtFn || api.postThought
      const data = await postFn(message)

      // Clear form on success
      setMessage('')

      // Call success callback
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
