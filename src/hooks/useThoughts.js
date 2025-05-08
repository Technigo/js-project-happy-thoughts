import { useState, useEffect } from 'react'

export const useThoughts = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newMessageId, setNewMessageId] = useState(null)

  const API_URL = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts'

  // Fetch all thoughts
  const fetchThoughts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Check if data exists and has the expected structure
      if (data && Array.isArray(data)) {
        setMessages(data)
      } else {
        console.error('Unexpected API response structure:', data)
        setMessages([])
        setError('Unexpected data format from API')
      }
    } catch (error) {
      console.error('Error fetching thoughts:', error)
      setError('Failed to load happy thoughts. Please try again.')
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  // Add new thought
  const addThought = async (message) => {
    // Check if message is an object or string
    const messageText = typeof message === 'object' ? message.message : message

    if (
      !messageText ||
      typeof messageText !== 'string' ||
      messageText.trim() === ''
    ) {
      return false
    }

    // For optimistic UI - create temporary message that will be shown before API response
    const tempThought = {
      _id: Date.now().toString(),
      message: message,
      hearts: 0,
      createdAt: new Date().toISOString()
    }

    // Update UI immediately (optimistic update)
    setMessages((prevMessages) => [tempThought, ...(prevMessages || [])])
    setNewMessageId(tempThought._id)

    // Clear animation effect after delay
    setTimeout(() => {
      setNewMessageId(null)
    }, 1000)

    try {
      // Send to API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })

      if (!response.ok) {
        throw new Error(`Failed to post thought: ${response.status}`)
      }

      // Get the actual thought from API with server-generated ID
      const data = await response.json()

      // Replace the temporary thought with the real one from the server
      setMessages((prevMessages) =>
        prevMessages.map((thought) =>
          thought._id === tempThought._id ? data : thought
        )
      )

      return true
    } catch (error) {
      console.error('Error posting thought:', error)
      // Could remove the temporary thought on error if desired
      // For now we'll leave it for better UX
      return false
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchThoughts()
  }, [])

  return {
    thoughts: messages,
    loading,
    error,
    newMessageId,
    fetchThoughts,
    addThought
  }
}
