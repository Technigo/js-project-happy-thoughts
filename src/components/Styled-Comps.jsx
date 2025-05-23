import styled from "styled-components"


export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  background: #fabda5b3;
  padding: 1.5rem;
  box-shadow: 8px 8px;
  border: 2px solid black;
  margin: 20px;

  @media (min-width: 426px) {
    margin: 0 auto;
    max-width: 550px;
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
  padding: 1.5rem;

  @media (min-width: 426px) {
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
  }
`

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 1.5rem;
  box-shadow: 8px 8px;
  border: 2px solid black;
  margin: 20px;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  width: 100%;
  hyphens: auto;
  background-color: white;

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

export const LikeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const LikeButton = styled.button`
  padding: 15px;
  border-radius: 30px;
  border: #b0b0b062;
  background: #b0b0b062;
  transition: transform 0.6s ease;
  perspective: 1000px; /* Needed for 3D effect */

  &.spin {
    animation: spinYColor 0.6s ease;
  }

  @keyframes spinYColor {
    0% {
      transform: rotateY(0deg);
      color: #b0b0b062;
      border-color: #b0b0b062;
      background: #b0b0b062;
    }
    50% {
      transform: rotateY(180deg);
      color: red;          
      border-color: red;
      background: #ffdbcdba;
    }
    100% {
      transform: rotateY(360deg);
      color: #b0b0b062; 
      border-color: #b0b0b062;
      background: #b0b0b062;
    }
  }
`

export const CountText = styled.p`
  color: #a2a3a4;
`