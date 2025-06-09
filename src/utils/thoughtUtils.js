import { extractUserFromToken } from './authUtils';

/**
 * Processes a thought by adding user-specific fields
 */
export const processThought = (thought) => {
  const token = localStorage.getItem('token');
  let userId = null;
  
  if (token) {
    try {
      const user = extractUserFromToken(token);
      userId = user._id;
    } catch {
      // Ignore parsing errors
    }
  }
  
  return {
    ...thought,
    isLikedByUser: userId ? thought.likedBy?.includes(userId) : false,
    likesCount: thought.likesCount || thought.hearts || 0
  };
};

/**
 * Creates an optimistic thought for immediate UI updates
 */
export const createOptimisticThought = (message) => {
  const token = localStorage.getItem('token');
  let currentUser = null;
  
  if (token) {
    try {
      const user = extractUserFromToken(token);
      currentUser = {
        _id: user._id,
        email: user.email,
        name: 'You'
      };
    } catch {
      // Ignore parsing errors
    }
  }

  return {
    _id: `temp-${Date.now()}`,
    message,
    createdAt: new Date().toISOString(),
    likesCount: 0,
    isLikedByUser: false,
    owner: currentUser,
    isOptimistic: true
  };
};

/**
 * Creates optimistic like update for a thought
 */
export const createOptimisticLikeUpdate = (thought) => {
  return {
    ...thought,
    isLikedByUser: !thought.isLikedByUser,
    likesCount: thought.isLikedByUser 
      ? (thought.likesCount || 0) - 1 
      : (thought.likesCount || 0) + 1
  };
};

/**
 * Finds the correct position to reinsert a thought maintaining chronological order
 */
export const findInsertPosition = (thoughts, thoughtToInsert) => {
  const insertIndex = thoughts.findIndex(t => 
    new Date(t.createdAt) < new Date(thoughtToInsert.createdAt)
  );
  
  return insertIndex === -1 ? thoughts.length : insertIndex;
};

/**
 * Reinserts a thought at the correct chronological position
 */
export const reinsertThought = (thoughts, thoughtToInsert) => {
  const insertIndex = findInsertPosition(thoughts, thoughtToInsert);
  
  return [
    ...thoughts.slice(0, insertIndex),
    thoughtToInsert,
    ...thoughts.slice(insertIndex)
  ];
};

/**
 * Handles API errors and returns appropriate error message
 */
export const handleApiError = (error, defaultMessage, authMessage) => {
  if (error.message === 'Authentication required') {
    return authMessage;
  }
  return defaultMessage;
};

/**
 * Processes API response data and extracts error message
 */
export const extractErrorMessage = (data, fallback) => {
  return data.details || data.error || fallback;
};

/**
 * Creates state updater for optimistic thought operations
 */
export const createOptimisticUpdater = (thoughtId, updateFn) => {
  return (prev) => prev.map((thought) => 
    thought._id === thoughtId ? updateFn(thought) : thought
  );
};

/**
 * Creates state updater for removing thoughts
 */
export const createRemoveUpdater = (thoughtId) => {
  return (prev) => prev.filter((thought) => thought._id !== thoughtId);
};

/**
 * Creates state updater for replacing optimistic thoughts with real ones
 */
export const createReplaceUpdater = (targetId, newThought) => {
  return (prev) => prev.map((thought) => 
    thought._id === targetId ? newThought : thought
  );
}; 