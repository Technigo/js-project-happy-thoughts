import { postThought } from '../api/thoughts';
import { useState } from 'react';

function usePostThought(onSuccess) {
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);

  const sendThought = (message) => {
    setPosting(true);
    postThought(message)
      .then((t) => {
        const mapped = {
          id: t._id,
          text: t.message,
          hearts: t.hearts,
          createdAt: t.createdAt,
        };
        setError(null);
        onSuccess(mapped);
      })
      .catch((error) => setError(error.message))
      .finally(() => setPosting(false));
  };

  return { sendThought, loading: posting, error };
}

export default usePostThought;
