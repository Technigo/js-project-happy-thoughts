import { useState } from "react"
import styled from "styled-components"


const CardWrapper = styled.section `
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 3px;
  border: 1px solid var(--color-border);
  box-shadow: 4px 6px 2px rgba(0, 0, 0, 0.8);
  width: 100%;
  max-width: 600px;
  height: 130px;
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
    margin: 30px auto;
    
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
    margin: 30px auto;
    
}
`
const MessageText = styled.p `
font-size: 16px;                 
font-weight: 500;                   
margin: 0;
color: black;   
padding-left: 10px;

`

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 5px;
  margin-top: auto; 
`

const Button = styled.button `
background-color: var(--color-likebutton);
color: var(--color-text);
border: none;
border-radius: 20px;
padding: 6px 12px;
font-size: 14px;
cursor: pointer;
transition: background-color 0.3s ease;
margin-bottom: 10px;



&:focus {
background-color: var(--color-button);
}
`

const TimeStamp = styled.div `
  font-size: 12px;                    
  color: black;  
  margin-right: 10px;
margin-top: 10px;

`

//Updated with API thoughs. Displays a single Happy Thought with message, timestamp, and a like button (local update only- no api yet)

const MessageCard = ({ message }) => {
  console.log("Card message:", message);
  const [likes, setLikes] = useState(message.hearts || 0)
  console.log(message)
  return (
    <CardWrapper>
      <MessageText>{message.message}</MessageText>
      <FooterContainer>
      <Button onClick={() => setLikes(likes + 1)}> ❤️ x {likes}</Button>
      <TimeStamp>{message.createdAt}</TimeStamp>
      </FooterContainer>
    </CardWrapper>
  )
}

export default MessageCard

