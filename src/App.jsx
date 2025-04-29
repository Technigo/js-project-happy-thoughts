import { useState } from "react" 
import "./index.css"
import GlobalStyle from "./styles/GlobalStyle.jsx"

//Function
export const App = () => {
  const [messageText, setMessageText] = useState("") // Creates a state variable called "messageText" (initially an empty string) and a function "setMessageText" to update it. This will store whatever the user types in the text field.


  //
  const handleMessage = (event) => { //Defines a function called "handleMessage" that accepts an event parameter.
    event.preventDefault() //Prevents the default browser behavior when a form is submitted (which would normally reload the page).

    if (messageText.trim() !== '') { 
      console.log(messageText)

      setMessageText("") //Clears the text input field by setting the "messageText" state variable back to an empty string.
    }
  }
  
  return (
    <>  
    <GlobalStyle />
      <h1>Happy Thoughts</h1>
      {/*The formbox is for entering new messages*/}
      <form onSubmit={handleMessage}> 
  <div className="form-container">
    <label htmlFor="input">What's making you happy right now?</label>
    <textarea
      id="input"
      value={messageText} 
      onChange={(event) => setMessageText(event.target.value)} 
    />
    <button type="submit"> ❤️ Send Happy Thought! ❤️</button>
  </div>
</form>
      
      
    </>
  )
}




  