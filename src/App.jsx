import { useEffect, useState } from "react"
import { API_URL } from "./utils/constants"

import Form from "../src/sections/Form"
import Header from "../src/sections/Header"
import { Loader } from "./components/Loader"
import { GlobalStyle } from "./GlobalStyles"
import { MsgBoard } from "./sections/MsgBoard"

const App = () => {

  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(false)

  const addNewThought = (newThought) => {
    setThoughts(prev => [newThought, ...prev])
  }

  const fetchAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_URL)
      if (response.ok) {
        const data = await response.json()
        setThoughts(data.response)
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
