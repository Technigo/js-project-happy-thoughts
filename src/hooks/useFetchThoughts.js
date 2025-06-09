import { fetchThoughts } from '../api/thoughts';
import { useState, useEffect } from 'react';

function useFetchThoughts() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchThoughts(page)
      .then((data) => {
        const mapped = data.results.map((thought) => ({
          id: thought._id,
          message: thought.message,
          likes: thought.likes,
          createdAt: thought.createdAt,
        }));
        setThoughts((prev) => [...prev, ...mapped]);
        setTotalPages(data.totalPages);
        setError(null);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [page]);

  //För att kunna ladda om hela listan
  const reload = () => {
    setThoughts([]);
    setPage(1);
  };

  return {
    thoughts,
    loading,
    error,
    reload,
    page,
    setPage,
    totalPages,
    setThoughts,
  };
}

export default useFetchThoughts;
