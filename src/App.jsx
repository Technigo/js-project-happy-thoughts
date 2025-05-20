import { GlobalStyle } from "./GlobalStyles"
import Header from "../src/sections/Header"
import Form from "../src/sections/Form"
import { useEffect } from "react"

const App = () => {
  
  
  useEffect(() => {
    console.log("mount")
  })
 

  return (
    <>
      <GlobalStyle />
      <Header />
      <Form />
  
    </>
  )
}

export default App
