import { fetchThoughts } from '../api/thoughts';
import { useState, useEffect } from 'react';

function useFetchThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = () => {
    setLoading(true);
    fetchThoughts()
      .then((data) => {
        // Mappa om varje object till { id, text, hearts, createdAt } för att slippa _id
        const mapped = data.map((t) => ({
          id: t._id,
          text: t.message,
          hearts: t.hearts,
          createdAt: t.createdAt,
        }));
        setThoughts(mapped);
        setError(null);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(reload, []);

  return { loading, thoughts, error, reload, setThoughts };
}

export default useFetchThoughts;
