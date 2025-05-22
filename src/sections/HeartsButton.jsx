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

const HeartsButton = ({ hearts, id }) => {
  const [count, setCount] = useState(hearts)

  const handleLike = async (event) => {
    event.preventDefault()    
    
    try {
      const response = await fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to post like")
      }

      const newLike = await response.json()
        setCount(newLike.hearts)
        
    } catch (error) {
      console.error("Error liking message:", error)
    }
  }

  return (
    <ButtonContainer> 
        <LikeButton
          onClick={handleLike}>♥️
        </LikeButton>
        <CountText>x {count}</CountText>
      </ButtonContainer>
  )
}

export default HeartsButton