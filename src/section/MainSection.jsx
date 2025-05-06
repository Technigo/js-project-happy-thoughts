import { FormCard } from "../components/FormCard"
import { MessageList } from "../components/MessasgeList"
import { useState, useEffect } from "react"



export const MainSection = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts')
      .then(res => res.json())
      .then(data => {
        setMessages(data)

      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const addMessage = (message) => {
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
    })
      .then(res => res.json())
      .then(newMessage => {
        setMessages(prev => [newMessage, ...prev])
      })
      .catch(err => console.error(err))

  }
    

  return (
    <section className="max-w-md min-h-screen px-5 py-10 mx-auto">
      <FormCard onSubmit={addMessage} />
      <MessageList messages={messages} />

    </section>
  )
}

