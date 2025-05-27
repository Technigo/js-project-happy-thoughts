import { useState, useEffect } from "react";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import QuestionCard from "./components/QuestionCard.jsx";
import MessageList from "./components/MessageList.jsx";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const App = () => {
  const [messageText, setMessageText] = useState(""); //what the user types
  const [thoughts, setThoughts] = useState([]); //thoughts from API
  const [loading, setLoading] = useState(true); //loading state
  const [error, setError] = useState(""); //error message

  //fetch thoughts when component mount
  useEffect(() => {
    setLoading(true);

    fetch("https://happy-thoughts-api-4ful.onrender.com/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No more thoughts today");
        }

        return response.json();
      })

      .then((data) => {
        setThoughts(data);
      })

      .finally(() => {
        setLoading(false);
      });
  }, []);

  //function runs when user send message via form
  const handleMessage = (event) => {
    event.preventDefault(); //no reload

    const trimmed = messageText.trim();
    if (trimmed.length < 5 || trimmed.length > 140) {
      setError("Your message must be between 5-140 characters");
      return;
    }

    fetch("https://happy-thoughts-api-4ful.onrender.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageText }),
    })
      .then((response) => response.json())
      .then((newThought) => {
        //add new thought
        setThoughts([newThought, ...thoughts]); //adds new thought, keeps old via array
        setMessageText("");
        setError("");
      })
      .catch((error) => console.error("Failed to post thought", error));
  };

  if (loading) {
    return (
      <LoadingWrapper>
        <p>Loading Thoughts...</p>
      </LoadingWrapper>
    );
  }

  //renders app layout
  return (
    <>
      <GlobalStyle />
      <h1>Happy Thoughts</h1>
      <QuestionCard
        messageText={messageText}
        setMessageText={setMessageText}
        handleMessage={handleMessage}
        error={error}
      />
      <MessageList thoughts={thoughts} />
    </>
  );
};

export default App;
