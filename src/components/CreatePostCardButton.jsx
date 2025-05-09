import styled from 'styled-components'

const ButtonStyled = styled.button`
  background-color: #FFADAD;
  border: none;
  border-radius: 40px;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  flex: 0 0 auto;
  font-size: 1rem;
  cursor: pointer;
  align-self: center;
`

const CreatePostCardButton = ({ onSubmit }) => {

  return (
    <ButtonStyled onClick={onSubmit}>
      ❤️ Send In ❤️
    </ButtonStyled>
  )
}

export default CreatePostCardButton