import { GlobalStyle } from "./GlobalStyles"
import Header from "../src/sections/Header"
import Form from "../src/sections/Form"
import MessagesCard from "../src/sections/MessagesCard"

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Form />
      <MessagesCard />
      
    </>
  )
}

export default App
