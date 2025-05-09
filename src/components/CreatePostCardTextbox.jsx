import styled from 'styled-components'

const TextareaStyled = styled.textarea`
  resize: none;
  margin: 1rem 0 1rem 0;
  padding: 1rem;
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
        onChange={(e) => setMessage(e.target.value)}
      ></TextareaStyled>
    </>
  )
}

export default CreatePostCardTextbox