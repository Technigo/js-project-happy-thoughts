import { useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h2`
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  color: #333;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const CharacterCount = styled.span`
  font-size: 0.9rem;
  color: ${props => props.$isError ? '#ff4444' : '#666'};
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  margin: 5px 0;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  background: #ffb6c1;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #ff99a8;
  }
`;

const HappyThoughtForm = ({ onSubmit }) => {
  const [thought, setThought] = useState('');
  const [error, setError] = useState('');
  const maxLength = 140;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (thought.trim().length === 0) {
      setError('Please enter a thought');
      return;
    }
    if (thought.length > maxLength) {
      setError('Thought is too long');
      return;
    }
    onSubmit(thought);
    setThought('');
    setError('');
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>What's making you happy right now?</Title>
      <TextArea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="Type your happy thought..."
        rows={3}
      />
      <FormFooter>
        <CharacterCount $isError={thought.length > maxLength}>
          {maxLength - thought.length} characters remaining
        </CharacterCount>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">
          ❤️ Send Happy Thought ❤️
        </SubmitButton>
      </FormFooter>
    </FormContainer>
  );
};

export default HappyThoughtForm; 