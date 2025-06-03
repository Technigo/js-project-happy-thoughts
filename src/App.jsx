import { GlobalStyle } from "./GlobalStyles"
import Header from "../src/sections/Header"
import Form from "../src/sections/Form"
import { useState, useEffect } from "react"
import { MsgBoard } from "./sections/MsgBoard"
import { Loader } from "./components/Loader"

const App = () => {

  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(false)

  const addNewThought = (newThought) => {
    setThoughts(prev => [newThought, ...prev])
  }

  const url = "http://localhost:8000/thoughts?hearts=2"

  const fetchAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setThoughts(data)
      }

    } catch(error) {
      console.log(error)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  if (loading) {
    return <Loader />
  } 
 

  return (
    <>
      <GlobalStyle />
      <Header />
      <Form addNewThought={addNewThought}/>
      <MsgBoard thoughts={thoughts}/>
    </>
  )
}

export default App
