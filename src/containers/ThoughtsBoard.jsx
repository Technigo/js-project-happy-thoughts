// src/containers/ThoughtsBoard.jsx
import useFetchThoughts from '../hooks/useFetchThoughts';
import usePostThought from '../hooks/usePostThought';
import useLikeThought from '../hooks/useLikeThought';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import { addUniqueSortedThought } from '../utils/thoughtUtils';

export default function ThoughtsBoard() {
  const {
    thoughts,
    loading,
    error: fetchError,
    setThoughts,
    page,
    setPage,
    totalPages,
  } = useFetchThoughts();

  const {
    sendThought,
    posting,
    error: postError,
  } = usePostThought((newThought) => {
    setThoughts((prev) => addUniqueSortedThought(prev, newThought));
  });

  const {
    like,
    loading: liking,
    error: likeError,
  } = useLikeThought((updatedThought) => {
    // // 🧪 Fakes error för ett specifikt id:
    // if (updatedThought.id === '684828c66c268fe1534fb6c0') {
    //   throw new Error('Fake like error');
    // }
    setThoughts((prev) =>
      prev.map(
        (t) =>
          t.id === updatedThought.id
            ? updatedThought // byt ut hela objektet
            : t // låt övriga vara oförändrade
      )
    );
  });

  return (
    <>
      <ThoughtForm
        onNewThought={sendThought}
        disabled={posting}
        error={postError && 'Could not post, please try again'}
      />

      {loading && <p>Loading…</p>}

      {!loading && fetchError && (
        <p style={{ textAlign: 'center', color: 'gray' }}>No posts yet</p>
      )}

      {!loading && !fetchError && (
        <ThoughtList
          thoughts={thoughts}
          onLike={like}
          liking={liking}
          likeError={likeError}
        />
      )}

      {!loading && page < totalPages && (
        <button onClick={() => setPage((prev) => prev + 1)}>
          Visa fler tankar
        </button>
      )}
    </>
  );
}
