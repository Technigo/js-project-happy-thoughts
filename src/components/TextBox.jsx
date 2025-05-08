import { usePostThought } from '../hooks/usePostThought'
import { Button } from './Button'
import styled from 'styled-components'
import { media } from '../media'

export const StyledTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 12px 8px;
  width: 300px;
  background-color: var(--color-background);
  border: 2px solid black;
  box-shadow: 6px 6px 0 0 black;
  margin: 2rem auto;

  @media ${media.tablet} {
    padding: 24px 16px;
    width: 400px;
  }
  @media ${media.desktop} {
    padding: 32px 24px;
    width: 500px;
  }
`

const StyledHeading = styled.h2`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 12px;
  margin-top: 0;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;

  @media ${media.tablet} {
    font-size: 14px;
    margin-bottom: 16px;
  }
  @media ${media.desktop} {
    font-size: 16px;
    margin-bottom: 16px;
  }
`

const StyledForm = styled.form`
  width: 100%;
`
const StyledInput = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 8px;
  border: 2px solid #ccc;
  font-size: 12px;
  resize: none;
  font-family: inherit;
  display: block;
  line-height: 1.2;
  vertical-align: top;

  &::placeholder {
    /* Remove the absolute positioning */
    position: static;
    color: #999;
    font-size: 12px;
  }

  @media ${media.tablet} {
    font-size: 14px;
    height: 80px;
  }
  @media ${media.desktop} {
    font-size: 16px;
    height: 100px;
  }
`
const StyledHandleRemainingChars = styled.p`
  color: ${(props) => (props.$remaining < 0 ? 'red' : '#333')};
  font-size: 12px;
  margin-top: 4px;
`

// Form component to accept thoughts from the user
// with usePostThought (hook) that handles the actual posting logic

export const TextBox = ({ onSubmit }) => {
  // State variables and functions from the usePostThought hook
  const {
    message,
    isPosting,
    error,
    remainingChars,
    handleInputChange,
    addThought
  } = usePostThought((newThought) => {
    // This function will be called after successful posting
    if (onSubmit) onSubmit(newThought)
  })

  return (
    <StyledTextBox>
      <StyledHeading>What's making you happy right now?</StyledHeading>
      <StyledForm onSubmit={addThought}>
        <StyledInput
          type='text'
          placeholder='Type your happy thought here...'
          value={message}
          onChange={handleInputChange}
          disabled={isPosting}
        />
        <StyledHandleRemainingChars $remaining={remainingChars}>
          {remainingChars < 0
            ? 'You have exceeded the maximum character limit!'
            : `${remainingChars} characters remaining`}
        </StyledHandleRemainingChars>
        {error && <StyledError>{error}</StyledError>}
        <Button
          text='❤️ Send Happy Thought ❤️'
          type='submit'
          disabled={message.trim() === '' || remainingChars < 0 || isPosting}
        />
      </StyledForm>
    </StyledTextBox>
  )
}
