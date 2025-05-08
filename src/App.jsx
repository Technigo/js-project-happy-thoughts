import { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import HappyThoughtForm from './components/HappyThoughtForm';
import ThoughtList from './components/ThoughtList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import LikedBadge from './components/LikedBadge';
import HeroSection from './components/HeroSection';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: white;
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

const API_URL = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts';
const LOCAL_STORAGE_KEY = 'likedThoughtIds';

const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [likedThoughtIds, setLikedThoughtIds] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Fetch thoughts from API on mount
  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch thoughts');
        return res.json();
      })
      .then((data) => {
        setThoughts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Could not load happy thoughts. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Store likedThoughtIds in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likedThoughtIds));
  }, [likedThoughtIds]);

  // Add a new thought
  const addThought = (message, onError) => {
    setError('');
    setLoading(true);
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message && data._id) {
          setThoughts((prev) => [data, ...prev]);
        } else if (data.errors || data.message) {
          if (onError) onError(data.message || 'Invalid input');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Could not post your thought. Please try again.');
        setLoading(false);
      });
  };

  // Like a thought
  const handleLike = (thoughtId) => {
    fetch(`${API_URL}/${thoughtId}/like`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((updatedThought) => {
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === updatedThought._id ? updatedThought : thought
          )
        );
        // If this thought hasn't been liked by the user before, add to likedThoughtIds
        setLikedThoughtIds((prev) =>
          prev.includes(thoughtId) ? prev : [...prev, thoughtId]
        );
      })
      .catch(() => {
        setError('Could not like the thought. Please try again.');
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
        <ThoughtList thoughts={thoughts} onLike={handleLike} likedThoughtIds={likedThoughtIds} />
      </AppContainer>
    </>
  );
};

export default App;
