import Message from "./components/Message"
import Button from "./components/Button"
import { useState } from "react"
import styled from "styled-components"

const StyledCard = styled.div`
background-color: #dfdada;
border: 1px solid #0e0d0d;
box-shadow: 4px 4px black;
display: flex;
flex-direction: column;
align-items: flex-start;
max-width: 320px;
padding: 10px;
width: 100%;
margin: auto;

`
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  textarea {
    width: 100%;
    min-height: 80px;
    padding: 10px;
    font-size: 1rem;
  }

  button {
    align-self: flex-start;
    padding: 10px 15px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 20px;
  }
`

const MessageList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 20px auto;
  max-width: 320px;
`

const MessageItem = styled.div`
  background: #faf8f8;
  border: 1px solid #0e0d0d;
  box-shadow: 4px 4px black;
  padding: 10px;
  max-width: 320px;
`

export const App = () => {
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')

  const handleMessageSubmit = (event) => {
    event.preventDefault()
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: Date.now(),
        text: messageText,
        createdAt: new Date().toLocaleString()
      }
    ])
    setMessageText("")
  }

  return (
    <>

      <h1>Happy Thoughts</h1>
      <StyledCard>
        <StyledForm onSubmit={handleMessageSubmit} >
          <label htmlFor="message">What is making you happy right now?</label>

          <textarea
            id="message"
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
          />

          <button type="submit">Send Happy Thought</button>
          <p>Characters left: {140 - messageText.length}</p>

        </StyledForm >
      </StyledCard>
      <MessageList>
        {
          messages.map((message) => (
            <MessageItem key={message.id}>
              <p>{message.text}</p>
              <p>{message.createdAt}</p>
            </MessageItem>
          ))
        }
      </MessageList>
      {/* <Message />
      <Button /> */}

    </>
  )
}
