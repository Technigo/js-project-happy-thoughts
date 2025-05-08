import { useState } from "react"
import styled from "styled-components"
import moment from "moment"

const CardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 3px;
  border: 1px solid var(--color-border);
  box-shadow: 4px 6px 2px rgba(0, 0, 0, 0.8);
  width: 100%;
  max-width: 500px;
  height: 100px;
  gap: 8px;
  margin: 20px auto;
  background-color: var(--color-background);
`

const MessageText = styled.p`
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

const LikeWrapper = styled.div `
  display: flex;
  align-items: center;
  gap: 5px;

`

const Button = styled.button`
  background-color: var(--color-likebutton);
  color: var(--color-text);
  border: none;
  border-radius: 50px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 5px;
  margin-bottom: 5px;

  &:focus {
    background-color: var(--color-button);
  }
`
const Paragraph = styled.div `
font-size: 12px;
color: var (--color-text);
margin-top: 5px;

`
const TimeStamp = styled.div`
  font-size: 12px;
  color: var (--color-text);
  margin-right: 10px;
  margin-top: 15px;
  margin-bottom: 5px;
`

const MessageCard = ({ message }) => {
  const [likes, setLikes] = useState(message.hearts || 0)

  //send likes to API and fetch them back
  const handleLike = () => {
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${message._id}/like`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => setLikes(likes + 1))
      .catch((error) => console.error("Failed to like the thought", error))
  }

  return (
    <CardWrapper>
      <MessageText>{message.message}</MessageText>
      <FooterContainer>
        <LikeWrapper>
        <Button onClick={handleLike}>❤️</Button>
        <Paragraph> x {likes} </Paragraph>
        </LikeWrapper>
        <TimeStamp>{moment(message.createdAt).fromNow()} </TimeStamp>
      </FooterContainer>
    </CardWrapper>
  )
}

export default MessageCard


