import React from 'react';
import styled from 'styled-components';
import ThoughtForm from './components/ThoughtForm';
import ThoughtList from './components/ThoughtList';

const AppWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
`;

export const App = () => {
  // const [thoughts, setthoughts] = useState([]); ??

  const TestNewThought = (message) => {
    console.log('Ny tanke:', message);
  };

  return (
    <div>
      <h1>Happy Thoughts App</h1>
      <ThoughtForm onNewThought={TestNewThought} />
      <ThoughtList />
    </div>
  );
};
