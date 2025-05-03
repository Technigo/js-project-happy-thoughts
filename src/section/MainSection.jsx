import { FormCard } from "../components/FormCard"
import { MessageList } from "../components/MessasgeList"
import { useState } from "react"



export const MainSection = () => {
  const [messages, setMessages] = useState([])

  const addMessage = (message) => {
    if (message.trim() === '') return;
    setMessages((prev) => [...prev, message])
  };

  return (
    <section className="bg-lime-200 max-w-md min-h-screen px-5 py-10 mx-auto">
      <FormCard onSubmit={addMessage} />
      <MessageList messages={messages} />
      
    </section>
  )
}

