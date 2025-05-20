import { GlobalStyle } from "./GlobalStyles"
import Header from "../src/sections/Header"
import Form from "../src/sections/Form"
import MessagesCard from "../src/sections/MessagesCard"
import { useEffect , useState } from "react"

const App = () => {
  const [count, setCount] = useState('0')
  
  useEffect(() => {
    console.log("mount")
  })
 

  return (
    <>
      <GlobalStyle />
      <Header />
      <Form />
      <MessagesCard />

      <div> {count}
        <button
          onClick={() => setCount(c => c+1)}>Increment touches
        </button>
      </div>
      
    </>
  )
}

export default App
