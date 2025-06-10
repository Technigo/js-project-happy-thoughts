import { useState } from "react"
import { API_URL } from "../utils/constants"

import * as Styled from "../components/Styled-Comps"

const Form = ({ addNewThought }) => {

   const [MessageText, setMessageText] = useState("")
   const [error, setError] = useState("")
   const msgLength = MessageText.length

   const handleSubmit = async (event) => {
      event.preventDefault()    
      setError("")

      if (msgLength < 5 || msgLength > 140)  {
        setError("Message must be between 5 and 140 characters.")
        return
      }
      
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify({ message: MessageText }),
          headers: { "Content-Type": "application/json" },
        })

        if (!response.ok) {
          throw new Error("Failed to post message")
        }

        const newThought = await response.json()
          addNewThought(newThought.response)
          setMessageText('')

      } catch (error) {
        setError(error.message)
      }
    }

  return (
      <Styled.FormContainer onSubmit={handleSubmit}>
        <label aria-labelledby="message">
          <Styled.FormTitle>What's making you happy right now?</Styled.FormTitle>
          <Styled.MessageInput
            id="message"
            type="text"
            onChange={event => {
              setMessageText(event.target.value)
              setError("")  
            }}
            value={MessageText}
            placeholder="Hakuna Matata"
            />
          <Styled.CharCount $invalid={msgLength < 5 || msgLength > 140}>
            Characters: {msgLength} / 140
          </Styled.CharCount>
        </label>
        <Styled.FormButton
          type="submit"
          disabled={msgLength < 5 || msgLength > 140}
          >
          ♥️ Share a happy thought! ♥️
          </Styled.FormButton>
          {msgLength > 0 && error && (
            <p style={{ color: 'red'}}>
             {error}
            </p>
          )}
      </Styled.FormContainer>
  ) 
}

export default Form