import { keyframes } from "styled-components"
import styled from "styled-components"

const scrollingTitle = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`
const TitleContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  width: clamp(300px, 80%, 600px);
  overflow: hidden;
  white-space: nowrap;
  padding: 0 1rem;
`
const Title = styled.h1`
  text-align: center;
  padding: 2rem 1rem;
  animation: ${scrollingTitle} 10s linear infinite;
`

const Header = () => {
  return (
    <TitleContainer> 
    <Title> 💬 Happy Thoughts 💬 </Title>
    </TitleContainer>
  )
}

export default Header