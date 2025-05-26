import { postThought } from '../api/thoughts';
import { useState } from 'react';

function usePostThought(onSuccess) {
  const [error, setError] = useState(null);
  const [posting, setPosting] = useState(false);

  const sendThought = (message) => {
    setPosting(true);
    postThought(message)
      .then((newThought) => {
        setError(null);
        onSuccess(newThought); // <-- skicka vidare just det nya objektet
      })
      .catch((error) => setError(error.message))
      .finally(() => setPosting(false));
  };

  return { sendThought, loading: posting, error };
}

export default usePostThought;
