// App.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThoughtForm } from './components/ThoughtForm';
import { ThoughtList } from './components/ThoughtList';

const Main = styled.main`
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Heading = styled.h1`
  text-align: center;
  font-family: 'Helvetica Neue', sans-serif;
`;

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts')
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching thoughts:', err);
        setIsLoading(false);
      });
  }, []);



  const submitMessage = (message) => {
    setIsLoading(true);
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
      })
      .catch((err) => {
        console.error('Error posting thought:', err);
        // Här kan du lägga till en global error-state om du vill
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Main>
      <Heading>Happy Thoughts</Heading>
      <ThoughtForm onSubmitMessage={submitMessage} isLoading={isLoading} />
      {isLoading ? <p>Loading...</p> : <ThoughtList thoughts={thoughts} />}
    </Main>
  );

};
