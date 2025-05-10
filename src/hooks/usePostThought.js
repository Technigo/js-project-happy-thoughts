import { useState, useRef } from 'react'
import { api } from '../api/api'

export const usePostThought = (onSuccess, postThoughtFn) => {
  const [message, setMessage] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState(null)

  // Use a ref to track submission state (more reliable than state for preventing duplicates)
  const isSubmittingRef = useRef(false)

  // Min and max characters for thoughts
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
    // Don't post if already submitting, prevent duplicate submissions
    if (isSubmittingRef.current) {
      console.warn('⚠️ Prevented duplicate submission!')
      return false
    }

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

    isSubmittingRef.current = true
    setIsPosting(true)
    setError(null)

    console.log('Starting API call for:', message)

    try {
      // Use the provided postThoughtFn if available, otherwise fall back to API
      const postFn = postThoughtFn || api.postThought
      const data = await postFn(message)

      setMessage('')
      onSuccess?.(data)

      return true
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      return false
    } finally {
      setIsPosting(false)
      // Release the lock after a short delay to prevent rapid resubmission
      setTimeout(() => {
        isSubmittingRef.current = false
      }, 500)
    }
  }

  // Form submission handler
  const handleSubmit = (e) => {
    // Always prevent default form submission
    if (e && e.preventDefault) {
      e.preventDefault()
    }

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
