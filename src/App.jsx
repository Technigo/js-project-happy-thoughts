import { useState, useEffect } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { Message } from './components/Message'
import { TextBox } from './components/TextBox'
import { LikeCounter } from './components/LikeCounter'
import { Loader } from './components/Loader'

export const App = () => {
  const [messages, setMessages] = useState([])
  const [newMessageId, setNewMessageId] = useState(null)
  const [loading, setLoading] = useState(false)

  const getUrl = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts'

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch(getUrl)
      const data = await response.json()

      // Log the API response to see its structure
      console.log('API response:', data)

      // Check if data exists and has the expected structure
      if (data && data.messages) {
        setMessages(data.messages)
      } else if (data && Array.isArray(data)) {
        // If the API returns an array directly
        setMessages(data)
      } else {
        console.error('Unexpected API response structure:', data)
        setMessages([])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
      setMessages([])
    } finally {
      // this block executes no matter what, wheter there was an error or not.
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleNewMessage = (newMessage) => {
    // Time-stamp the message with a unique ID
    // Using _id to be consistent with API format
    const messageWithId = {
      _id: Date.now().toString(), // Convert to string to match API format
      message: newMessage, // Use message property to match API format
      hearts: 0, // Initialize with 0 hearts
      createdAt: new Date().toISOString() // Include createdAt to match API format
    }

    // Add defensive check to ensure messages is defined
    setMessages((prevMessages) => [messageWithId, ...(prevMessages || [])])
    setNewMessageId(messageWithId._id)
  }

  // Added useEffect to clear newMessageId after animation
  useEffect(() => {
    if (newMessageId) {
      const timer = setTimeout(() => {
        setNewMessageId(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [newMessageId])

  if (loading) {
    return <Loader /> // Placeholder for loading state
  }

  return (
    <div className='App'>
      <GlobalStyles />
      <TextBox onSubmit={handleNewMessage} />
      <LikeCounter />
      {Array.isArray(messages) &&
        messages.map((messageItem) => {
          // Extract the proper ID, handling both API and local messages
          const messageId =
            messageItem._id || messageItem.id || Math.random().toString()
          const messageText = messageItem.message || messageItem.text || ''

          return (
            <Message
              key={messageId}
              id={messageId}
              message={messageText}
              isNew={messageId === newMessageId}
              hearts={messageItem.hearts || 0}
              createdAt={messageItem.createdAt || messageItem.date || ''}
            />
          )
        })}
    </div>
  )
}
