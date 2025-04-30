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
    width: 400px;
  }
  @media ${media.desktop} {
    width: 500px;
  }
`

const StyledHeading = styled.h2`
  display: flex;
  align-items: left;
  justify-content: flex-start;
  font-size: 12px;
  margin-top: 0;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
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
`

export const TextBox = ({ onSubmit }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (message.trim() !== '') {
      // Call the onSubmit callback with the message
      onSubmit(message)
      setMessage('') // Clear the input after submission
    }
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <StyledTextBox>
      <StyledHeading>What's making you happy right now?</StyledHeading>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type='text'
          placeholder='Type your happy thought here...'
          value={message}
          onChange={handleInputChange}
        />
        <Button
          text='❤️ Send Happy Thought ❤️'
          type='submit'
          disabled={message.trim() === ''}
        />
      </StyledForm>
    </StyledTextBox>
  )
}
