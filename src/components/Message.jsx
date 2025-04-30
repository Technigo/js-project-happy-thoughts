import { useState } from 'react'
import { Button } from './Button'
import styled from 'styled-components'

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px 8px;
  width: 400px;
  background-color: #fff;
  border: 2px solid black;
  box-shadow: 6px 6px 0 0 black;
  margin: 2rem auto;
  font-size: 14px;
`
export const MessageText = styled.p`
  margin: 8px;
`

export const LikeSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`

export const Message = ({ message }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const handleLike = () => {
    if (isLiked) {
      // If already liked, decrement the count
      setLikeCount(likeCount - 1)
    } else {
      // If not liked, increment the count
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <MessageContainer>
      <MessageText>{message}</MessageText>
      <LikeSection>
        <Button
          variant='icon'
          icon={'❤️'}
          onClick={handleLike}
          isLiked={isLiked}
        />
        <p>{`x ${likeCount}`}</p>
      </LikeSection>
    </MessageContainer>
  )
}
