import { postThought } from '../api/thoughts';
import { useState } from 'react';

function usePostThought(onSuccess) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendThought = (message) => {
    setLoading(true);
    postThought(message)
      .then((newThought) => {
        setError(null);
        onSuccess(newThought); // <-- skicka vidare just det nya objektet
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  return { sendThought, loading, error };
}

export default usePostThought;
