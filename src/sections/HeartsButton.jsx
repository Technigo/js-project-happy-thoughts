import { useState } from "react"
import styled from "styled-components"

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const LikeButton = styled.button`
  padding: 15px;
  border-radius: 30px;
  border: #b0b0b062;
  background: #b0b0b062;
`

const CountText = styled.p`
  color: #a2a3a4;
`

const HeartsButton = ({ hearts }) => {
  const [count, setCount] = useState(hearts)

  return (
    <ButtonContainer> 
        <LikeButton
          onClick={() => setCount((prev) => prev+1)}>♥️
        </LikeButton>
        <CountText>x {count}</CountText>
      </ButtonContainer>
  )
}

export default HeartsButton