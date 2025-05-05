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

  // Fetch thoughts on initial render
  useEffect(() => {
    fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts')
      .then((res) => res.json())
      .then((data) => setThoughts(data))
      .catch((err) => console.error('Error fetching thoughts:', err));
  }, []);

  // Add a new thought
  const addThought = (newThought) => {
    setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
  };

  // Handle like click
  const handleLike = (thoughtId) => {
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thoughtId}/like`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((updatedThought) => {
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === updatedThought._id ? updatedThought : thought
          )
        );
      })
      .catch((err) => console.error('Error liking thought:', err));
  };

  return (
    <Main>
      <Heading>Happy Thoughts</Heading>
      <ThoughtForm onAddThought={addThought} />
      <ThoughtList thoughts={thoughts} onLike={handleLike} />
    </Main>
  );
};
