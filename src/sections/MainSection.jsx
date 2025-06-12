import { useEffect, useState } from "react"
import Error from "../components/Error"
import FormCard from "../components/FormCard"
import ControlsCard from "../components/ControlsCard"
import Loader from "../components/Loader"
import MessagesContainer from "../components/MessagesContainer"

const MainSection = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const baseUrl = "https://think-happy-api.onrender.com/thoughts"
  // const baseUrl = "http://localhost:8080/thoughts" // local api
  const [fetchUrl, setFetchUrl] = useState("")

  const [page, setPage] = useState()
  const [maxPages, setMaxPages] = useState(1)

  const [sortBy, setSortBy] = useState("createdAt")
  const [filterOn, setFilterOn] = useState("all")

  useEffect(() => {
    let newUrl = baseUrl
    if (!page || page < 1) {
      setPage(1)
    }
    newUrl += `?page=${page}`
    if (sortBy) {
      newUrl += `&sort_by=-${sortBy}`
    }
    if (filterOn) {
      if (filterOn === "all") {
        newUrl += ""
      } else {
        newUrl += `&tag=${filterOn}`
      }
    }
    setFetchUrl(newUrl)
  }, [page, sortBy, filterOn])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setErrorMessage("")
        setLoading(true)
        const response = await fetch(fetchUrl)
        if (response.ok) {
          const data = await response.json()
          setMessages(data.response.data)
          setMaxPages(Math.ceil(data.response.totalCount / data.response.limit))
        }
      } catch (error) {
        setErrorMessage(`An error occured when loading thoughts: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [fetchUrl])

  const postMessage = async (message, tags) => {
    let tagsArray = tags
    if (tags.length === 0) {
      tagsArray = ["other"]
    }
    try {
      setErrorMessage("")
      const response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify({
          message: message,
          tags: tagsArray
        }),
        headers: { "Content-Type": "application/json" }
      })
      if (response.ok) {
        const newMessage = await response.json()
        setMessages((messages) => [newMessage.response, ...messages])
      }
    } catch (error) {
      setErrorMessage(`An error occured when posting thought: ${error.message}`)
    } finally {
      //
    }
  }

  const likeMessage = async (id) => {
    try {
      setErrorMessage("")
      const response = await fetch(`${baseUrl}/${id}/like`, { method: "PATCH" })
      if (response.ok) {
        const likedMessage = await response.json()
        setMessages((messages) => messages.map(message =>
          message._id === id ? { ...message, hearts: likedMessage.response.hearts } : message
        ))
      }
    } catch (error) {
      setErrorMessage(`An error occured when liking thought: ${error.message}`)
    } finally {
      //
    }
  }

  const deleteMessage = async (id) => {
    try {
      setErrorMessage("")
      const response = await fetch(`${baseUrl}/${id}`, { method: "DELETE" })
      if (response.ok) {
        const deletedMessage = await response.json()
        setMessages((messages) => messages.filter(message =>
          message._id !== id
        ))
      }
    } catch (error) {
      setErrorMessage(`An error occured when deleting thought: ${error.message}`)
    } finally {
      //
    }
  }

  const editMessage = async (id, newMessage) => {
    try {
      setErrorMessage("")
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          message: newMessage,
        }),
        headers: { "Content-Type": "application/json" }
      })
      if (response.ok) {
        const editedMessage = await response.json()
        setMessages((messages) => messages.map(message =>
          message._id === id ? { ...message, message: editedMessage.response.message } : message
        ))
      }
    } catch (error) {
      setErrorMessage(`An error occured when editing thought: ${error.message}`)
    } finally {
      //
    }
  }

  const handleMessageSubmission = (message, tags) => {
    postMessage(message, tags)
  }

  const handleLike = (id) => {
    likeMessage(id)
  }

  const handleDelete = (id) => {
    deleteMessage(id)
  }

  const handleEdit = (id, newMessage) => {
    editMessage(id, newMessage)
  }

  const handleChangePage = (newPage) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setPage(newPage)
  }

  const handleSorting = (sorting) => {
    setPage(1)
    setSortBy(sorting)
  }

  const handleFilter = (filter) => {
    setPage(1)
    setFilterOn(filter)
  }

  return (
    <section className="flex flex-col gap-10 py-10 min-h-screen">
      <FormCard onMessageSubmission={handleMessageSubmission} />
      <ControlsCard sortBy={sortBy} filterOn={filterOn} onSort={handleSorting} onFilter={handleFilter} />
      {loading && <Loader />}
      {errorMessage && <Error text={errorMessage} />}
      {!errorMessage && <MessagesContainer messages={messages} page={page} maxPages={maxPages} onChangePage={handleChangePage} onFilter={handleFilter} onLike={handleLike} onDelete={handleDelete} onEdit={handleEdit} />}
    </section>
  )
}

export default MainSection