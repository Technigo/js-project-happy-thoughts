import styled from 'styled-components'

const TextareaStyled = styled.textarea`
  resize: none;
  margin: 1rem 0 1rem 0;
  padding: 1rem;
`

const CountStyled = styled.sup`
  color:rgb(0, 0, 0);
  font-size: 0.75rem;
  margin-left: 0.5rem;
`

const CreatePostCardTextbox = ({ message, setMessage }) => {
  return (
    <>
      <p>
        What's making you happy right now?
      </p>
      <TextareaStyled 
        rows="3"
        placeholder="Your thoughts here..."
        value={message}
        onChange={(e) => {
          if (e.target.value.length <= 140) {
          setMessage(e.target.value);
          }
        }}
      ></TextareaStyled>
      <CountStyled>{message.length} / 140 characters</CountStyled>
    </>
  )
}

export default CreatePostCardTextbox