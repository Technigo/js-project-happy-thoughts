import styled from 'styled-components'
import { media } from '../media'
import { useState } from 'react'
import { Button } from './Button'

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
  font-weight: 500;
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

export const TextBox = ({ onSubmit }) => {
  const [message, setMessage] = useState('')
  const maxLength = 140
  // Calculate remainingChars directly from message length
  const remainingChars = maxLength - message.length

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check both conditions before submitting
    if (message.trim() !== '' && remainingChars >= 0) {
      // Call the onSubmit callback with the message
      onSubmit(message)
      setMessage('') // Clear the input after submission
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
  }

  // Handle the Enter key press to submit the form
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <StyledTextBox>
      <StyledHeading>What's making you happy right now?</StyledHeading>
      <StyledForm onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
        <StyledInput
          type='text'
          placeholder='Type your happy thought here...'
          value={message}
          onChange={handleInputChange}
        />
        <StyledHandleRemainingChars $remaining={remainingChars}>
          {remainingChars < 0
            ? 'You have exceeded the maximum character limit!'
            : `${remainingChars} characters remaining`}
        </StyledHandleRemainingChars>
        <Button
          text='❤️ Send Happy Thought ❤️'
          type='submit'
          disabled={message.trim() === '' || remainingChars < 0}
        />
      </StyledForm>
    </StyledTextBox>
  )
}
