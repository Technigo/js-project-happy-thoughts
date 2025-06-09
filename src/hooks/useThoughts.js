import { useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { authenticatedFetch } from '../utils/authUtils';
import { 
  processThought, 
  createOptimisticThought, 
  createOptimisticLikeUpdate, 
  reinsertThought,
  handleApiError,
  extractErrorMessage,
  createOptimisticUpdater,
  createRemoveUpdater,
  createReplaceUpdater
} from '../utils/thoughtUtils';

/**
 * Custom hook for managing thoughts state and operations
 */
export const useThoughts = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchThoughts = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${API_URL}/thoughts?page=1&limit=20`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch thoughts');
        }
        
        const data = await response.json();
        const thoughtsArray = data.thoughts || data;
        const processedThoughts = thoughtsArray.map(processThought);
        setThoughts(processedThoughts);
      } catch {
        setError('Could not load happy thoughts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();
  }, []);

  const addThought = async (message, onError) => {
    setError('');
    setLoading(true);
    
    const optimisticThought = createOptimisticThought(message);
    setThoughts((prev) => [optimisticThought, ...prev]);
    
    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts`, {
        method: 'POST',
        body: JSON.stringify({ message })
      });
      
      const data = await response.json();
      
      if (response.ok && data.message && data._id) {
        const processedThought = processThought(data);
        setThoughts(createReplaceUpdater(optimisticThought._id, processedThought));
      } else {
        setThoughts(createRemoveUpdater(optimisticThought._id));
        const errorMessage = extractErrorMessage(data, 'Invalid input');
        if (onError) onError(errorMessage);
      }
    } catch (error) {
      setThoughts(createRemoveUpdater(optimisticThought._id));
      const errorMessage = handleApiError(
        error,
        'Could not post your thought. Please try again.',
        'Please log in to post a thought'
      );
      
      if (error.message === 'Authentication required' && onError) {
        onError(errorMessage);
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (thoughtId) => {
    const currentThought = thoughts.find(thought => thought._id === thoughtId);
    if (!currentThought) return;

    const optimisticUpdate = createOptimisticLikeUpdate(currentThought);
    setThoughts(createOptimisticUpdater(thoughtId, () => optimisticUpdate));

    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const updatedThought = await response.json();
        const processedThought = processThought(updatedThought);
        setThoughts(createReplaceUpdater(updatedThought._id, processedThought));
        return updatedThought._id;
      } else {
        throw new Error('Failed to update like status');
      }
    } catch (error) {
      setThoughts(createOptimisticUpdater(thoughtId, () => currentThought));
      const errorMessage = handleApiError(
        error,
        'Could not like the thought. Please try again.',
        'Please log in to like thoughts.'
      );
      setError(errorMessage);
      throw error;
    }
  };

  const updateThought = async (thoughtId, message) => {
    const currentThought = thoughts.find(thought => thought._id === thoughtId);
    if (!currentThought) {
      return { success: false, error: 'Thought not found' };
    }

    const optimisticUpdate = { ...currentThought, message, isOptimistic: true };
    setThoughts(createOptimisticUpdater(thoughtId, () => optimisticUpdate));

    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'PUT',
        body: JSON.stringify({ message })
      });
      
      if (response.ok) {
        const updatedThought = await response.json();
        const processedThought = processThought(updatedThought);
        setThoughts(createReplaceUpdater(updatedThought._id, processedThought));
        return { success: true, thought: processedThought };
      } else {
        setThoughts(createOptimisticUpdater(thoughtId, () => currentThought));
        const errorData = await response.json();
        const errorMessage = extractErrorMessage(errorData, 'Failed to update thought');
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      setThoughts(createOptimisticUpdater(thoughtId, () => currentThought));
      const errorMessage = handleApiError(
        error,
        'Could not update the thought. Please try again.',
        'Please log in to edit thoughts.'
      );
      return { success: false, error: errorMessage };
    }
  };

  const deleteThought = async (thoughtId) => {
    const thoughtToDelete = thoughts.find(thought => thought._id === thoughtId);
    if (!thoughtToDelete) {
      return { success: false, error: 'Thought not found' };
    }

    setThoughts(createRemoveUpdater(thoughtId));

    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        return { success: true };
      } else {
        setThoughts((prev) => reinsertThought(prev, thoughtToDelete));
        const errorData = await response.json();
        const errorMessage = extractErrorMessage(errorData, 'Failed to delete thought');
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      setThoughts((prev) => reinsertThought(prev, thoughtToDelete));
      const errorMessage = handleApiError(
        error,
        'Could not delete the thought. Please try again.',
        'Please log in to delete thoughts.'
      );
      return { success: false, error: errorMessage };
    }
  };

  return {
    thoughts,
    loading,
    error,
    addThought,
    handleLike,
    updateThought,
    deleteThought
  };
}; 