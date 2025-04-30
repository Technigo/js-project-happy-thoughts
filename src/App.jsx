import { useState } from 'react'
import { GlobalStyles } from './GlobalStyles'
import { Message } from './components/Message'
import { TextBox } from './components/TextBox'

export const App = () => {
  const [messages, setMessages] = useState([])

  const handleNewMessage = (newMessage) => {
    setMessages([...messages, newMessage])
  }

  return (
    <div className='App'>
      <GlobalStyles />
      <TextBox onSubmit={handleNewMessage} />
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  )
}
