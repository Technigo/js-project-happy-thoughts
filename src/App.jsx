import { useState } from "react"
import GlobalStyle from "./styles/GlobalStyle.jsx"
import QuestionCard from "./components/QuestionCard.jsx"
import MessageList from "./components/MessageList.jsx"

//manages the input text and stores messages using useState hook
export const App = () => {
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState([])

  //form submission, new message object + adding to list, clear input field
  const handleMessage = (event) => {
    event.preventDefault() 
    if (messageText.trim() !== '') {
      const newMessage = {
        id: Date.now(), 
        text: messageText,
        createdAt: new Date().toLocaleTimeString(),
        likes: 0
      }
      setMessages([newMessage, ...messages]) //spread operator method
      setMessageText('')
    }
  }

  return (
    <>
      <GlobalStyle />
      <h1>Happy Thoughts</h1>
      <QuestionCard
        messageText={messageText}
        setMessageText={setMessageText}
        handleMessage={handleMessage}
      />
      <MessageList messages={messages} />
    </>
  )
}

export default App