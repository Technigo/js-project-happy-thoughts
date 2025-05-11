import React, { useState } from 'react';
import styled from 'styled-components';

const FormLabel = styled.label`
  background-color: pink;
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
    <form onSubmit={handleSubmit}>
      <FormLabel>What’s making you happy right now?</FormLabel>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Share a happy thought...'
      ></textarea>
      <button>Send</button>
    </form>
  );
}

export default ThoughtForm;
