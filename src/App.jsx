import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import HappyThoughtForm from './components/HappyThoughtForm';
import ThoughtList from './components/ThoughtList';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.4;
  }
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const App = () => {
  const [thoughts, setThoughts] = useState([]);

  // Load thoughts from localStorage when the app starts
  useEffect(() => {
    const savedThoughts = localStorage.getItem('happyThoughts');
    if (savedThoughts) {
      setThoughts(JSON.parse(savedThoughts));
    }
  }, []);

  // Save thoughts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('happyThoughts', JSON.stringify(thoughts));
  }, [thoughts]);

  const addThought = (message) => {
    const newThought = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    setThoughts([newThought, ...thoughts]);
  };

  const handleLike = (thoughtId) => {
    setThoughts(thoughts.map(thought => 
      thought.id === thoughtId 
        ? { ...thought, likes: thought.likes + 1 }
        : thought
    ));
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <HappyThoughtForm onSubmit={addThought} />
        <ThoughtList thoughts={thoughts} onLike={handleLike} />
      </AppContainer>
    </>
  );
};

export default App;
