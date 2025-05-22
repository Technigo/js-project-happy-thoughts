import { useState } from "react"
import * as Styled from "../components/Styled-Comps"

const Form = ({ addNewThought }) => {

   const [MessageText, setMessageText] = useState('')
   const msgLength = MessageText.length

   const handleSubmit = async (event) => {
      event.preventDefault()    
      
      try {
        const response = await fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
          method: "POST",
          body: JSON.stringify({ message: MessageText }),
          headers: { "Content-Type": "application/json" },
        })

        if (!response.ok) {
          throw new Error("Failed to post message")
        }

        const newThought = await response.json()
          addNewThought(newThought)
          setMessageText('')
      } catch (error) {
        console.error("Error posting message:", error)
      }
    }

  return (
    <>
      <Styled.FormContainer onSubmit={handleSubmit}>
        <label htmlFor="">
          <Styled.FormTitle>What's making you happy right now?</Styled.FormTitle>
          <textarea
            type="text"
            onChange={event => setMessageText(event.target.value)}
            value={MessageText}
            placeholder="Hakuna Matata"
            />
          <p>Characters: {msgLength} / 140</p>
        </label>
        <Styled.FormButton
          type="submit"
          disabled={msgLength < 5 || msgLength > 140}
          >
          ♥️ Share a happy thought! ♥️
          </Styled.FormButton>
          {msgLength > 0 && (msgLength < 5 || msgLength > 140) && (
            <p style={{ color: 'red'}}>
              Message must be between 5 and 140 characters.
            </p>
          )}
      </Styled.FormContainer>
    </>
  ) 
}

export default Form