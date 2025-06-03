import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThoughtForm } from './components/ThoughtForm';
import { ThoughtList } from './components/ThoughtList';

const API_URL = 'https://happy-thoughts-api-xvxs.onrender.com/thoughts';

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
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const submitMessage = (message) => {
    setIsLoading(true);
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const likeThought = (id) => {
    fetch(`${API_URL}/${id}/like`, {
      method: 'PATCH',
    })

      .then((res) => res.json())
      .then(() => {
        setThoughts((prevThoughts) =>
          prevThoughts.map((thought) =>
            thought._id === id
              ? { ...thought, hearts: thought.hearts + 1 }
              : thought
          )
        );
      });
  };

  return (
    <Main>
      <Heading>Happy Thoughts</Heading>
      <ThoughtForm onSubmitMessage={submitMessage} isLoading={isLoading} />
      {isLoading ? <p>Loading...</p> : <ThoughtList thoughts={thoughts} onLike={likeThought} />}
    </Main>
  );
};
