import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThoughtForm from './components/ThoughtForm';
import ThoughtList from './components/ThoughtList';

const AppWrapper = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 5rem;
  }
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 768px) {
    gap: 4rem;
  }
`;

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  //Testa setThouts
  useEffect(() => {
    console.log('Uppdaterade thoughts:', thoughts);
  }, [thoughts]);

  const handleNewThought = (message) => {
    const newThought = {
      id: crypto.randomUUID(), //unikt id vid ev ta bort etc senare
      text: message,
    };
    setThoughts((currentThoughts) => [newThought, ...currentThoughts]);
  };

  return (
    <AppWrapper>
      <LayoutWrapper>
        <ThoughtForm onNewThought={handleNewThought} />
        <ThoughtList thoughts={thoughts} />
      </LayoutWrapper>
    </AppWrapper>
  );
};
