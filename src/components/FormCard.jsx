import { useState } from "react";
import styled from "styled-components";


const CardContainer = styled.div`
  background-color: lightgray;
  width: 100%;
  max-width: 400px;
  padding: 30px 40px; 
`
const TextArea = styled.textarea`
  background-color: lightyellow; 
  width: 100%;
`


export const FormCard = () => {
  const [text, setText] = useState('')

  return (
    <CardContainer>
      <form>
        <label>What's making you happy right now?</label>
        <TextArea
          onChange={(event) => setText(event.target.value)}
          value={text}>

        </TextArea>


      </form>
    </CardContainer>
  )
}