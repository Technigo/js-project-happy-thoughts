import styled from "styled-components"

import { HappyFaceIcon } from "../components/icons/HappyFaceIcon"
import { Title } from "../styling/Typography"
import { UserSignin } from "./UserSignin"

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: relative;  
  width: 50%;
`

const handleSignin = () => {
  console.log("You clicked signin")
}


export const Header = () => {
  return(
    <header>
    <Title>Happy Thoughts</Title>
    <ButtonWrapper>
      <button onClick={handleSignin}>      
        <HappyFaceIcon />
      </button>
    </ButtonWrapper>   
   
    </header>
    

  )
}