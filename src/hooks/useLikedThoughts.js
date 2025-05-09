import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'likedThoughtIds';

export const useLikedThoughts = () => {
  const [likedThoughtIds, setLikedThoughtIds] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Store likedThoughtIds in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likedThoughtIds));
  }, [likedThoughtIds]);

  const addLikedThought = (thoughtId) => {
    setLikedThoughtIds((prev) =>
      prev.includes(thoughtId) ? prev : [...prev, thoughtId]
    );
  };

  return {
    likedThoughtIds,
    addLikedThought
  };
}; 