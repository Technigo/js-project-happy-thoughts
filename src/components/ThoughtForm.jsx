import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  background-color: var(--color-grey);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  gap: 1rem;
  padding: 1rem;
`;

const FormLabel = styled.label`
  font-family: var(--font-ui);
`;

const Button = styled.button`
  background-color: var(--color-red);
  font-family: var(--font-ui);
  width: fit-content;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 9999px;
`;

function ThoughtForm({ onNewThought }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return; //Om meddelandet är tomt gör inget för tillfället
    onNewThought(input.trim());
    setInput('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel>What’s making you happy right now?</FormLabel>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Share a happy thought...'
      ></textarea>
      <Button type='submit'>❤️ Send Happy Thought ❤️</Button>
    </Form>
  );
}

export default ThoughtForm;
