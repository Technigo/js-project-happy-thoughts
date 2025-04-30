import styled from "styled-components"
import { FormCard } from "../components/FormCard"

const MainStyle = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex; 
  justify-content: center;
  align-items: center;
  
`
export const MainSection = () => {
  return (
    <MainStyle>
      <FormCard />
    </MainStyle>
  )

}