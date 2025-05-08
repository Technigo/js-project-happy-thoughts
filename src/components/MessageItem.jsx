import { useState, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"

const flare = keyframes`
  0% {opacity: 0; transform: scale(0.5) rotate(0deg);}
  50% {opacity: 1; transform: scale(1.2) rotate(45deg);}
  100% {opacity: 0; transform: scale(0.5) rotate(90deg);}
`

const StyledMessageItem = styled.div`
  background: #faf8f8;
  border: 1px solid #0e0d0d;
  box-shadow: 4px 4px black;
  padding: 10px;
  max-width: 320px;
  position: relative;
  overflow: hidden;
`
const FlareIcon = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 1.5rem;
  opacity: 0;
  ${({ $show }) =>
    $show &&
    css`
      animation: ${flare} 1.2s ease-out;
      opacity: 1;
    `}

`



// Funktion för att beräkna den relativa tiden
const timeAgo = (timestamp) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(timestamp)) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
}


const MessageItem = ({ text, createdAt, isNewest, likes, onLike }) => {
  const [showFlare, setShowFlare] = useState(false)

  useEffect(() => {
    if (isNewest) {
      setShowFlare(true)
      const timeout = setTimeout(() => setShowFlare(false), 1500)
      return () => clearTimeout(timeout)
    }
  }, [isNewest])


  // const [hearts, setHearts] = useState()

  return (
    <StyledMessageItem>
      {isNewest && <FlareIcon $show={showFlare}>✨</FlareIcon>}
      <p>{text}</p>
      <p>{timeAgo(createdAt)}</p>
      <button onClick={onLike}>❤️ x {likes}</button>
    </StyledMessageItem>
  )
}

export default MessageItem
