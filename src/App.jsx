import { useState } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { Message } from './components/Message'
import { TextBox } from './components/TextBox'

export const App = () => {
  const [messages, setMessages] = useState([])
  const [newMessageId, setNewMessageId] = useState(null)

  const handleNewMessage = (newMessage) => {
    // Time-stamp the message with a unique ID
    const messageWithId = {
      id: Date.now(),
      text: newMessage
    }

    setMessages([messageWithId, ...messages])
    setNewMessageId(messageWithId.id)
  }

  return (
    <div className='App'>
      <GlobalStyles />
      <TextBox onSubmit={handleNewMessage} />
      {messages.map((messageObj) => (
        <Message
          key={messageObj.id}
          message={messageObj.text}
          isNew={messageObj.id === newMessageId}
        />
      ))}
    </div>
  )
}
