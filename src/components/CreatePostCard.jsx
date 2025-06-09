import CreatePostCardTextbox from './CreatePostCardTextbox'
import CreatePostCardButton from './CreatePostCardButton'
import styled from 'styled-components'

const CreatePostCardStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  justify-self: center;
  background-color: #F2F0F0;
  color: black;
  border: 1px solid black;
  border-radius: 2px;
  padding: 1rem;
  box-shadow: 10px 10px 0px 0px rgba(0,0,0,1);
`

const CreatePostCard = ({ message, setMessage, onSubmit }) => {
  return (
    <CreatePostCardStyled>
      <CreatePostCardTextbox 
        message={message} 
        setMessage={setMessage} 
      />
      <CreatePostCardButton onSubmit={onSubmit} disabled={message.length < 5} />
    </CreatePostCardStyled>
  )
}

export default CreatePostCard