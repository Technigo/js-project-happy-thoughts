// ThoughtForm.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background: white;
  border: 1px solid black;
  box-shadow: 4px 4px 0 pink;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
`;

const Button = styled.button`
  background-color: pink;
  border: none;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
`;

const CharCounter = styled.p`
  text-align: right;
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: ${(props) => (props.isTooLong ? 'red' : '#666')};
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin: 0.5rem 0;
`;

export const ThoughtForm = ({ onSubmitMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const maxChars = 140;

  const isTooShort = message.trim().length > 0 && message.trim().length < 5;
  const isTooLong = message.length > maxChars;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === '') {
      setError('Please write something before submitting.');
      return;
    }

    if (isTooShort) {
      setError('Your message is too short. Write at least 5 characters.');
      return;
    }

    if (isTooLong) {
      setError('Your message is too long. Max 140 characters.');
      return;
    }

    onSubmitMessage(message);
    setMessage('');
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="message">What's making you happy right now?</label>
      <TextArea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="3"
        maxLength="200"
        disabled={isLoading}
      />
      <CharCounter isTooLong={isTooLong}>
        {maxChars - message.length} characters remaining
      </CharCounter>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? '💬 Sending...' : '💖 Send Happy Thought'}
      </Button>
    </Form>
  );
};
