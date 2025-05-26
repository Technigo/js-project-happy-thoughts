import { PostLikeThought } from '../api/thoughts';
import { useState } from 'react';

function useLikeThought(onSuccess) {
  const [error, setError] = useState(null);
  const [liking, setLiking] = useState(false);

  const likeThought = (id) => {
    setLiking(true);
    setError(null);

    PostLikeThought(id)
      .then((updatedThought) => {
        onSuccess(updatedThought);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLiking(false));
  };

  return { likeThought, loading: liking, error };
}

export default useLikeThought;
