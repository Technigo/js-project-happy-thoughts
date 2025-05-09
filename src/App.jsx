import styled from 'styled-components';
import HappyThoughtForm from './components/HappyThoughtForm';
import ThoughtList from './components/ThoughtList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import LikedBadge from './components/LikedBadge';
import HeroSection from './components/HeroSection';
import GlobalStyle from './styles/GlobalStyles';
import { useThoughts } from './hooks/useThoughts';
import { useLikedThoughts } from './hooks/useLikedThoughts';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }

  @media (max-width: 320px) {
    padding: 8px;
  }
`;

const App = () => {
  const { thoughts, loading, error, addThought, handleLike } = useThoughts();
  const { likedThoughtIds, addLikedThought } = useLikedThoughts();

  const handleLikeThought = (thoughtId) => {
    handleLike(thoughtId).then((updatedThoughtId) => {
      if (updatedThoughtId) {
        addLikedThought(updatedThoughtId);
      }
    });
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <HeroSection />
        <HappyThoughtForm onSubmit={addThought} loading={loading} />
        <LikedBadge count={likedThoughtIds.length} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <Loader />}
        <ThoughtList 
          thoughts={thoughts} 
          onLike={handleLikeThought} 
          likedThoughtIds={likedThoughtIds} 
        />
      </AppContainer>
    </>
  );
};

export default App;
