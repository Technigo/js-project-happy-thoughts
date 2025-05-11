import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThoughtForm from './components/ThoughtForm';
import ThoughtList from './components/ThoughtList';

const AppWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
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
      <h1>Happy Thoughts App</h1>
      <ThoughtForm onNewThought={handleNewThought} />
      <ThoughtList thoughts={thoughts} />
    </AppWrapper>
  );
};
