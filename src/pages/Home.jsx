import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import Error from "../components/Error"
import MessageForm from "../components/MessageForm"
import ListControls from "../components/ListControls"
import Loader from "../components/Loader"
import MessagesContainer from "../components/MessagesContainer"

const Home = () => {
  const { currentUser } = useAuth()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // const baseUrl = "https://think-happy-api.onrender.com/thoughts"
  const baseUrl = "http://localhost:8080/thoughts" // local api
  const [fetchUrl, setFetchUrl] = useState(baseUrl)

  const [page, setPage] = useState()
  const [maxPages, setMaxPages] = useState(1)

  const [sortBy, setSortBy] = useState("createdAt")
  const [filterOn, setFilterOn] = useState("all")

  // update fetch url when page/sortBy/filterOn changes
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

  useEffect(() => {
    fetchMessages()
  }, [fetchUrl])

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

  const handleUpdate = (updatedMessages) => {
    setMessages(updatedMessages)
    fetchMessages()
  }

  const handleError = (errorMessage) => {
    setErrorMessage(errorMessage)
  }

  return (
    <section className="flex flex-col gap-10 py-10 min-h-screen">
      <h2 className="pb-2 text-(--color-text) text-center text-2xl font-bold">
        Welcome {currentUser ? currentUser.username : "to Happy Thoughts"}!
      </h2>
      <MessageForm update={handleUpdate} onError={handleError} />
      <ListControls sortBy={sortBy} filterOn={filterOn} onSort={handleSorting} onFilter={handleFilter} />
      {loading && <Loader />}
      {errorMessage && <Error text={errorMessage} />}
      {!errorMessage && <MessagesContainer messages={messages} page={page} maxPages={maxPages} onChangePage={handleChangePage} onFilter={handleFilter} onError={handleError} update={handleUpdate} />}
    </section>
  )
}

export default Home


//<section className="flex flex-col gap-10 py-10 min-h-screen">
//       <h1 className="pb-2 text-(--color-text) text-center text-2xl font-bold">
//         Welcome to Happy Thoughts!
//       </h1>
//       <UserForm title="Log in" />
//     </section>