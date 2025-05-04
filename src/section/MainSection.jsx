import { FormCard } from "../components/FormCard"
import { MessageList } from "../components/MessasgeList"
import { useState } from "react"



export const MainSection = () => {
  const [messages, setMessages] = useState([])

  const addMessage = (text) => {
    const newMessage = {
      text,
      timestamp: new Date(),
      likes: 0
    };
    setMessages((prev) => [...prev, newMessage])
  }

  const incrementLike = (i) => {
    setMessages((prev) => {
      const likes = [...prev]
      likes[i].likes += 1
      return likes

    })
  }

  return (
    <section className="bg-lime-200 max-w-md min-h-screen px-5 py-10 mx-auto">
      <FormCard onSubmit={addMessage} />
      <MessageList 
        messages={messages}
        onLike={incrementLike} />
      
    </section>
  )
}

