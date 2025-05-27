import styled from "styled-components"

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%;
  padding: 0 10px;
  box-sizing: border-box;

  label {
    font-size: 1rem;
    font-weight: bold;
  }

  textarea {
    width: 100%;
    min-height: 80px;
    padding: 10px;
    font-size: 1rem;
    box-sizing: border-box;
    resize: none;      
  }

  button {
    align-self: flex-start;
    padding: 10px 15px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 20px;
    background-color: #f78a8a;
    border: none;
  }

  p {
    font-size: 0.8rem;
    color: #555;
  }
`


const MessageForm = ({ messageText, setMessageText, onSubmit }) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <label htmlFor="message">What is making you happy right now?</label>
      <textarea
        id="message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <button type="submit">❤️ Send Happy Thought ❤️</button>
      <p>Characters left: {140 - messageText.length}</p>
    </StyledForm>
  );
}

export default MessageForm