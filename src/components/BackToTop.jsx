import styled from "styled-components"

const BtnIcon = styled.button`
  font-size: 2rem;
  cursor: pointer;
  border: 2px solid lightgray;
  padding: 5px;
  box-shadow: 2px 2px 5px #00000033;
  border-radius: 20%;
  left: 50%;
  margin: 0 auto;


  &:hover {
    border: 2px solid gray;
    scale: 1.1;
  }
  
`

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const BackToTop = () => {
  return (
    <>
      <BtnIcon 
        type="button"
        onClick={scrollToTop}>
        🔝
      </BtnIcon>
    </>
  )
}

export default BackToTop