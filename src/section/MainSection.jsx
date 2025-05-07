import { FormCard } from "../components/FormCard"
import { MessageList } from "../components/MessasgeList"
import { useState, useEffect } from "react"
import { Loader } from "../components/Loader"



export const MainSection = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const url = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts'

  useEffect(() => {
    setIsLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setMessages(data)

      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const addMessage = (message) => {
    setApiError('')
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
    })
      .then(res => {
        if (!res.ok) throw new Error('Could not save your thought')
          return res.json()
      })
      .then(newMessage => {
        setMessages(prev => [newMessage, ...prev])
        console.log(newMessage)
      })
      .catch(err => setApiError(err.message))

  }
  
  const likeMessage = (id) => {
    fetch(`${url}/${id}/like`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(updatedMessage => {
        setMessages(prev => 
          prev.map(msg =>
            msg._id === id ? {...msg, hearts: updatedMessage.hearts} : msg
          )
        )
      })
      .catch(err => {
        console.error('Could not like message', err)
        setApiError('Could not like message. Please try again later')
      })


  }

  if (isLoading) {
    return <Loader />
  }  

  return (
    <section className="max-w-md min-h-screen px-5 py-10 mx-auto">
      <FormCard 
        onSubmit={addMessage}
        apiError={apiError}  />
      <MessageList 
        messages={messages}
        onLike={likeMessage} />

    </section>
  )
}

