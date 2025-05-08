import { useEffect, useState } from "react";
import styled from "styled-components";
import MessageForm from "./components/MessageForm";
import MessageItem from "./components/MessageItem";

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
`;

const MessageList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 20px auto;
  max-width: 320px;
`;

export const App = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [messageText, setMessageText] = useState("")

  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((response) => response.json())
      .then((data) => {
        setMessages(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching messages:", error)
        setIsLoading(false)
      })
  }, [])


  const handleMessageSubmit = (event) => {
    event.preventDefault();
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: messageText,
        createdAt: new Date().toLocaleString(),
      },
    ]);
    setMessageText("");
  };

  return (
    <>
      <h1>Happy Thoughts</h1>

      <StyledCard>

        {isLoading && <p>Loading...</p>}
        <MessageForm
          messageText={messageText}
          setMessageText={setMessageText}
          onSubmit={handleMessageSubmit}
        />
      </StyledCard>

      <MessageList>
        {[...messages].reverse().map((message, index) => (
          <MessageItem
            key={message._id}
            text={message.message}
            likes={message.hearts}
            createdAt={message.createdAt}

            isNewest={index === 0}
          />
        ))}
      </MessageList>
    </>
  );
};