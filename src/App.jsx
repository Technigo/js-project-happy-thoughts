import { useState, useEffect } from "react"
import GlobalStyle from "./styles/GlobalStyle.jsx"
import QuestionCard from "./components/QuestionCard.jsx"
import MessageList from "./components/MessageList.jsx"

// Main component, one for the input field (messageText), one for the list of thoughts fetched from the API (thoughts)
export const App = () => {
  const [messageText, setMessageText] = useState("")
  const [thoughts, setThoughts] = useState([]) 

  //useEffect runs once on page load to fetch the latest happy thoughts from the API and store them in state
  useEffect(() => {
    const fetchThoughts = async () => {
      const response = await fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      if (response.ok) {
        const data = await response.json()
        setThoughts(data) //saving them
      }
    }

    fetchThoughts()
  }, [])

// handles q.card: sends the new message to the API, adds it to the top of the thoughts list, and clears the input field
  const handleMessage = (event) => {
    event.preventDefault()

    //makes sure the message has the right amount of characters
    if (messageText.trim().length < 5 || messageText.length > 140) {
      alert("Your message must be between 5 and 140 characters.") //change alert, not good!
      return;
    }
  
    if (messageText.trim() !== "") {
      fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageText }),
      })
        .then((response) => response.json())
        .then((newThought) => {
          setThoughts([newThought, ...thoughts]) //spread method
          setMessageText("")
        })
        .catch((error) => console.error("Failed to post thought", error))
    }
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
      />
      <MessageList thoughts={thoughts} />
    </>
  )
}

export default App