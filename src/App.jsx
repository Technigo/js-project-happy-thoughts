import { useState, useEffect } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { Message } from './components/Message'
import { TextBox } from './components/TextBox'

export const App = () => {
  const [messages, setMessages] = useState([])
  const [newMessageId, setNewMessageId] = useState(null)

  const getUrl = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts'

  const fetchMessages = async () => {
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
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleNewMessage = (newMessage) => {
    // Time-stamp the message with a unique ID
    const messageWithId = {
      id: Date.now(),
      text: newMessage
    }

    // Add defensive check to ensure messages is defined
    setMessages((prevMessages) => [messageWithId, ...(prevMessages || [])])
    setNewMessageId(messageWithId.id)
  }

  // Add a useEffect to clear newMessageId after animation
  useEffect(() => {
    if (newMessageId) {
      const timer = setTimeout(() => {
        setNewMessageId(null)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [newMessageId])

  // Return with proper defensive checks
  return (
    <div className='App'>
      <GlobalStyles />
      <TextBox onSubmit={handleNewMessage} />
      {Array.isArray(messages) &&
        messages.map((messageItem) => {
          // Extract the message text based on the API structure
          let messageText

          if (typeof messageItem === 'string') {
            messageText = messageItem
          } else if (messageItem.text) {
            messageText = messageItem.text
          } else if (messageItem.message) {
            // This appears to be the correct property based on your error
            messageText = messageItem.message
          } else {
            // Fallback to stringifying, but avoid rendering the object directly
            messageText = JSON.stringify(messageItem)
          }

          const messageId = messageItem.id || messageItem._id

          return (
            <Message
              key={messageId || Math.random()}
              message={messageText}
              isNew={messageId === newMessageId}
            />
          )
        })}
    </div>
  )
}
