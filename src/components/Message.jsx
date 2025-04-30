import { useState } from 'react'
import { Button } from './Button'
import styled from 'styled-components'

export const StyledMessageContainer = styled.div``
export const StyledMessage = styled.div``
export const StyledMessageText = styled.p``

export const Message = ({ message }) => {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }
  return (
    <StyledMessageContainer>
      <StyledMessage>{message}</StyledMessage>
      <Button
        variant='icon'
        text={isLiked ? 'Unlike' : 'Like'}
        onClick={handleLike}
      />
    </StyledMessageContainer>
  )
}
