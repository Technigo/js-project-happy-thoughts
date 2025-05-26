import { PostLikeThought } from '../api/thoughts';
import { useState } from 'react';

function useLikeThought(onSuccess) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const likeThought = (id) => {
    setLoading(true);
    setError(null);

    PostLikeThought(id)
      .then((updatedThought) => {
        onSuccess(updatedThought);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return { likeThought, loading, error };
}

export default useLikeThought;
