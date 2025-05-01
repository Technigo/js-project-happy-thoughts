import { useState } from "react"
import styled from "styled-components"


const CardWrapper = styled.section `
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  border: 1px solid var(--color-border);
  box-shadow: 4px 6px 2px rgba(0, 0, 0, 0.8);
  width: 100%;
  max-width: 600px;
  gap: 8px;
  margin: 20px auto;
  background-color: var(--color-background);


  @media (min-width: 360px) {
    display: flex; 
    flex-direction: column;
    gap: 10px; 
    align-items: flex-start;
    max-width: 600px;
    width: 100%;
  
  
    width: auto; 
    max-width: 500px; 
    margin-left: 10px;
    margin: 0 auto;
    
  }

  @media (min-width: 1024px) and (max-width: 1600px) {
    display: flex;
    flex-direction: column;
    gap: 10px; 
    align-items: flex-start;
    max-width: 600px;
    width: 100%;


    width: auto;
    max-width: 500px; 
    margin-left: 10px;
    margin: 0 auto;
    
}
`
const MessageText = styled.p `
font-size: 16px;                 
font-weight: 500;                   
margin: 0;
color: black;   

`
const Button = styled.button `
background-color: var(--color-button);
color: #000;
border: none;
border-radius: 20px;
padding: 6px 12px;
font-size: 14px;
cursor: pointer;
align-self: flex-start;
transition: background-color 0.3s ease;

Button:focus {
background-color: var(--color-button);
}
`

const TimeStamp = styled.div `
  font-size: 12px;                    
  color: black;
  align-self: flex-end;   


`

//Renders one card w. one message, styled
const MessageCard = ({ message }) => {
  console.log("Card message:", message);
  const [likes, setLikes] = useState(message.likes || 0)
  console.log(message)
  return (
    <CardWrapper>
      <MessageText>{message.text}</MessageText>
      <Button onClick={() => setLikes(likes + 1)}> ❤️ x {likes}</Button>
      <TimeStamp>{message.createdAt}</TimeStamp>
    </CardWrapper>
  )
}

export default MessageCard

