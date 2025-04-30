import styled from "styled-components"

const CardWrapper = styled.section `
  border-radius: 3px;
  border: 1px solid var(--color-border);
  box-shadow: 4px 6px 2px rgba(0, 0, 0, 0.8);
  max-width: fit-content;
  margin: 0 auto;
  background-color: var(--color-background);


  @media (min-width: 360px) {
    display: flex; 
    flex-direction: column;
    gap: 10px; 
    align-items: flex-start;
    max-width: 600px;
    width: 100%;
  
  
    width: auto; 
    max-width: 500px; 
    margin-left: 10px;
    margin: 0 auto;
    
  }

  @media (min-width: 1024px) and (max-width: 1600px) {
    display: flex;
    flex-direction: column;
    gap: 10px; 
    align-items: flex-start;
    max-width: 600px;
    width: 100%;


    width: auto;
    max-width: 500px; 
    margin-left: 10px;
    margin: 0 auto;
    
}
`


const Card = ({ message }) => {
  return (
    <CardWrapper>
      <p>{message}</p>
    </CardWrapper>
  )
}

export default Card

