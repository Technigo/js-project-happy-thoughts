import { FormCard } from "../components/FormCard"
import { MessageList } from "../components/MessasgeList"
import { useState, useEffect } from "react"
import { Loader } from "../components/Loader"
import { LikeCount } from "../components/LikeCount"


export const MainSection = () => {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")
  const [likedCount, setLikedCount] = useState(0)

  // const url = "https://happy-thoughts-api-4ful.onrender.com/thoughts"
  //Local API
  //const url = "http://localhost:8080/thoughts" 

  //My render url 
  const url = "https://js-project-api-mk0z.onrender.com/thoughts"


  const fetchData = () => {
    setIsLoading(true)
    setApiError("")
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          throw new Error("API response indicated failure")
        }
        setMessages(data.response)

      })
      .catch(err => {
        console.error(err)
        setApiError("Could not load messages. Please try again later")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const addMessage = (message) => {
    setApiError("")
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message })
    })
      .then(res => {
        if (!res.ok) throw new Error("Could not save your thought")
        return res.json()
      })
      .then(newMessage => {
        setMessages(prev => [newMessage.response, ...prev])
        console.log(newMessage)
      })
      .catch(err => setApiError(err.message))
  }

  const likeMessage = (id, currentLikes) => {
    fetch(`${url}/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newLikes: currentLikes + 1 })

    })
      .then(res => res.json())
      .then(data => {
        const updatedMessage = data.response
        setMessages(prev =>
          prev.map(msg =>
            msg._id === id ? { ...msg, hearts: updatedMessage.hearts } : msg
          )
        )
      })
      .catch(err => {
        console.error("Could not like message", err)
        setApiError("Could not like message. Please try again later")
      })
  }

  const deleteMessage = (id) => {
    setApiError("")
    fetch(`${url}/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete the message")
        }
        return res.json()
      })
      .then(() => {
        setMessages((prev) => prev.filter((msg) => msg._id !== id))
      })
      .catch(err => {
        console.log(err)
        setApiError("Could not delete message. Please try again later.")
      })

  }

  const handleLike = (id) => {
    likeMessage(id)
    setLikedCount(c => c + 1)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section className="max-w-md min-h-screen px-5 py-10 mx-auto">
      <FormCard
        onSubmit={addMessage}
        apiError={apiError} />

      {isLoading && <Loader />}
      {likedCount > 0 && <LikeCount likeCount={likedCount} />}

      <MessageList
        messages={messages}
        onLike={handleLike}
        onDelete={deleteMessage} />
    </section>
  )
}

