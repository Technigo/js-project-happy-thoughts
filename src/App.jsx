import { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import MessageForm from "./components/MessageForm";
import MessageItem from "./components/MessageItem";


const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f0f0;
    font-family: "Poppins", sans-serif;
    color: #333;
    margin: 0;
    padding: 10px;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }
`

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
  box-sizing: border-box;
`

const MessageList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin: 20px auto;
  max-width: 320px;
  max-height: 400px;  /* HÖJD för scroll */
  overflow-y: auto;   /* Scrollbar */
  padding-right: 10px;
  border: 1px solid #aaa;
  background-color: #f8f8f8;
  box-sizing: border-box;
`
const Footer = styled.footer`
  text-align: center;
  margin-top: 20px;
  font-size: 0.8rem;
  color: #555;
  a {
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`


export const App = () => {
  const API_URL = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts"
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [messageText, setMessageText] = useState("")

  const fetchMessages = () => {
    setIsLoading(true);
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching messages:", error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  //Handle the liking of posts
  const handleLike = (id) => {
    fetch(`${API_URL}/${id}/like`, {
      method: "POST"
    })
      .then(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg._id === id ? { ...msg, hearts: msg.hearts + 1 } : msg
          )
        )
      })
      .catch((error) => console.error("Error liking message:", error))
  }

  const handleMessageSubmit = (event) => {
    event.preventDefault()

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageText }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchMessages()
        setMessageText("")
      })
      .catch((error) => console.error("Error posting message:", error))
  }


  return (
    <>
      <GlobalStyle />
      <h1>Happy Thoughts</h1>

      <StyledCard>
        <MessageForm
          messageText={messageText}
          setMessageText={setMessageText}
          onSubmit={handleMessageSubmit}
        />
      </StyledCard>

      <MessageList>
        {isLoading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((message, index) => (
            <MessageItem
              key={message._id}
              text={message.message}
              likes={message.hearts}
              createdAt={message.createdAt}
              onLike={() => handleLike(message._id)}
              isNewest={index === 0}
            />
          ))
        )}
      </MessageList>

      <Footer>
        <p>Made with ❤️ by Therese</p>
        <p>Check out the code on <a href="https://github.com/Lillebrorgroda/js-project-happy-thoughts">GitHub</a></p>
      </Footer>

    </>
  )
}