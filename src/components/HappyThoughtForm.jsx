import { useState } from 'react';
import styled from 'styled-components';
import CharacterCount from './CharacterCount';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { device } from '../styles/media';
import { useAuth } from '../stores/authStore';
import { useFormStore } from '../stores/uiStore';

const FormContainer = styled.form`
  background: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  border: 2px solid #bbb;
  padding: 20px;
  margin-bottom: 20px;
  max-width: 500px;
  width: 100%;

  @media ${device.mobile} {
    padding: 15px;
  }

  @media ${device.smallMobile} {
    padding: 12px;
  }
`;

const Title = styled.h2`
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  color: #333;

  @media ${device.smallMobile} {
    font-size: 1.1rem;
  }
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
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;

  @media ${device.smallMobile} {
    padding: 8px;
    font-size: 0.95rem;
    min-height: 70px;
  }
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;

  @media ${device.smallMobile} {
    gap: 8px;
  }
`;

/**
 * Form component for creating and submitting happy thoughts
 */
const HappyThoughtForm = ({ onSubmit, loading }) => {
  const { thoughtForm, setThoughtMessage, setThoughtError, resetThoughtForm } = useFormStore();
  const { isAuthenticated } = useAuth();

  const { message, error } = thoughtForm;
  const maxLength = 140;
  const minLength = 5;
  const isValid = message.trim().length >= minLength && message.length <= maxLength;

  const handleSubmit = (e) => {
    e.preventDefault();
    setThoughtError('');
    
    if (!isAuthenticated) {
      setThoughtError('Please log in to post a thought');
      return;
    }
    
    if (!isValid) return;
    
    onSubmit(message, (apiError) => setThoughtError(apiError));
    resetThoughtForm();
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>What's making you happy right now?</Title>
      <TextArea
        value={message}
        onChange={(e) => setThoughtMessage(e.target.value)}
        placeholder={isAuthenticated ? "Type your happy thought..." : "Please log in to post a thought..."}
        rows={3}
        disabled={loading || !isAuthenticated}
      />
      <FormFooter>
        <CharacterCount 
          count={maxLength - message.length} 
          isError={message.length > maxLength} 
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" disabled={loading || !isValid || !isAuthenticated}>
          ❤️ Send Happy Thought ❤️
        </Button>
      </FormFooter>
    </FormContainer>
  );
};

export default HappyThoughtForm; 