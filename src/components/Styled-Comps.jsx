import styled from "styled-components"


export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  background: #fabda5b3;
  padding: 20px;
  box-shadow: 8px 8px;
  border: 2px solid black;
  margin: 20px;

  @media (min-width: 426px) {
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
  }
`

export const FormTitle = styled.h2`
  align-self: center;
  font-size: 90%;
  padding: 10px 0;

  @media (min-width: 426px) {
    font-size: 100%;
  }
`

export const MessageBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px;

  @media (min-width: 426px) {
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
  }
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px;
  box-shadow: 8px 8px;
  border: 2px solid black;
  margin: 20px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: normal;
  width: 100%;
  hyphens: auto;

  @media (min-width: 426px) {
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
  }
`

export const FormButton = styled.button`
  padding: 10px;
  background: #ffdbcdba;
  border: solid red;
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 0 3px 2px red;
  

  &:hover {
    scale: 1.1;
    border: solid white;
    color: white;
    box-shadow: none;
  }
`

export const BoardDetails = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`