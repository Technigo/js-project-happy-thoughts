import { useState } from "react"
import GlobalStyle from "./styles/GlobalStyle.jsx"
import Form from "./components/Form.jsx"
import CardList from "./components/CardList.jsx"

//manages the input text and stores messages using useState hook
export const App = () => {
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState([])

  //form submission, new message object + adding to list, clear input field
  const handleMessage = (event) => {
    event.preventDefault() //no reload of page
    if (messageText.trim() !== '') {
      const newMessage = {
        id: Date.now(), //gives every message unique key in map method
        text: messageText
        createdAt: new Date().toLocaleTimeString.()
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
      <Form
        messageText={messageText}
        setMessageText={setMessageText}
        handleMessage={handleMessage}
      />
      <CardList messages={messages} />
    </>
  )
}

export default App