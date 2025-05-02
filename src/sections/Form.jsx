import styled from "styled-components"
import { useState } from "react"

const FormContainer = styled.form`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
`

const MessageBoard = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  align-items: center;
  gap: 24px;
`

const Form = () => {

   const [MessageText, setMessageText] = useState('')

   const [submittedMessage, setSubmittedMessage] = useState()

   const handleSubmit = (event) => {
      event.preventDefault()
      setSubmittedMessage(MessageText)
      setMessageText('')
   }

  return (
    <>
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="">
          <h2>What's making you happy right now?</h2>
          <textarea
            type="text"
            onChange={event => setMessageText(event.target.value)}
            value={MessageText}
            placeholder=""
            />
        </label>
        <button
          type="sumbit"
          >
          Share a happy thought!
          </button>
      </FormContainer>
      <MessageBoard>
        <h2>The Happy Feed</h2>
        <p>{submittedMessage}</p>
      </MessageBoard>
  </>
  ) 
}

export default Form