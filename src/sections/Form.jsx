import styled from "styled-components"
import { useState } from "react"

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  background: #fabda5b3;
  padding: 20px;
  box-shadow: 8px 8px;
  border: 2px solid black;
  margin: 20px;

  @media (min-width: 426px) {
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
  }
`

const FormTitle = styled.h2`
  align-self: center;
  font-size: 90%;
  padding: 10px 0;

  @media (min-width: 426px) {
    font-size: 100%;
  }
`

const MessageBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px;

  @media (min-width: 426px) {
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
  }
`

const FormButton = styled.button`
  
  padding: 10px;
  background: #ffdbcdba;
  border: solid red;
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 0 3px 2px red;
  

  &:hover {
    scale: 1.1;
    border: solid white;
    color: white;
    box-shadow: none;
  }
`

const Form = () => {

   const [MessageText, setMessageText] = useState('')

   const [submittedMessage, setSubmittedMessage] = useState()

   const handleSubmit = (event) => {
      event.preventDefault()
      setSubmittedMessage(MessageText)
      setMessageText('')
   }

   const charCount = () => {
    
   }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="">
          <FormTitle>What's making you happy right now?</FormTitle>
          <textarea
            type="text"
            onChange={event => setMessageText(event.target.value)}
            value={MessageText}
            placeholder=""
            />
            <p>Characters: {charCount} / 140 </p>
        </label>
        <FormButton
          type="sumbit"
          >
          ♥️ Share a happy thought! ♥️
          </FormButton>
      </FormContainer>
      <MessageBoard>
        <h2>The Happy Feed</h2>
        <p>{submittedMessage}</p>
      </MessageBoard>
  </>
  ) 
}

export default Form