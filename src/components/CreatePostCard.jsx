import CreatePostCardTextbox from './CreatePostCardTextbox'
import CreatePostCardButton from './CreatePostCardButton'
import styled from 'styled-components'

const CreatePostCardStyled = styled.div`
  display: flex;
  flex-direction: column;
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
      <CreatePostCardButton onSubmit={onSubmit} />
    </CreatePostCardStyled>
  )
}

export default CreatePostCard