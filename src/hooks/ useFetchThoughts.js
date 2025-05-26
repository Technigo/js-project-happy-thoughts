import { fetchThought } from '../api/thoughts';
import { useState, useEffect } from 'react';

function useFetchThought() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = () => {
    setLoading(true);
    fetchThought()
      .then((data) => {
        setThoughts(data);
        setError(null);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(reload, []);

  return { loading, thoughts, error, reload, setThoughts };
}

export default useFetchThought;
