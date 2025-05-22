import { useState } from "react"
import * as Styled from "../components/Styled-Comps"


const HeartsButton = ({ hearts, id }) => {
  const [count, setCount] = useState(hearts)

  const handleLike = async (event) => {
    event.preventDefault()    

    const button = event.currentTarget
    button.classList.add("spin")
    setTimeout(() => {
      button.classList.remove("spin")
    }, 600)
    
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
    <Styled.LikeButtonContainer> 
        <Styled.LikeButton
          onClick={handleLike}>♥️
        </Styled.LikeButton>
        <Styled.CountText>x {count}</Styled.CountText>
      </Styled.LikeButtonContainer>
  )
}

export default HeartsButton