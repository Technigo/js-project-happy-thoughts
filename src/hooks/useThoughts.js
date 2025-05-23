import { useState, useEffect } from 'react';

const API_URL = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts';

export const useThoughts = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    return fetch(`${API_URL}/${thoughtId}/like`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((updatedThought) => {
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === updatedThought._id ? updatedThought : thought
          )
        );
        return updatedThought._id;
      })
      .catch(() => {
        setError('Could not like the thought. Please try again.');
      });
  };

  return {
    thoughts,
    loading,
    error,
    addThought,
    handleLike
  };
}; 