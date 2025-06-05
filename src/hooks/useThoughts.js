import { useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { authenticatedFetch } from '../utils/authFetch';

export const useThoughts = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch thoughts from API on mount
  useEffect(() => {
    const fetchThoughts = async (page = 1, limit = 20) => {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${API_URL}/thoughts?page=${page}&limit=${limit}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch thoughts');
        }
        
        const data = await response.json();
        
        // Handle both paginated and direct array responses
        const thoughtsArray = data.thoughts || data;
        setThoughts(thoughtsArray);
        setLoading(false);
      } catch (err) {
        setError('Could not load happy thoughts. Please try again later.');
        setLoading(false);
      }
    };

    fetchThoughts();
  }, []);

  // Add a new thought (requires authentication) - with optimistic updates
  const addThought = async (message, onError) => {
    setError('');
    setLoading(true);
    
    // Create optimistic thought
    const optimisticThought = {
      _id: `temp-${Date.now()}`, // Temporary ID
      message,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      isLikedByUser: false,
      owner: null, // Will be set by server
      isOptimistic: true // Flag to track optimistic updates
    };

    // Optimistically add to top of list
    setThoughts((prev) => [optimisticThought, ...prev]);
    
    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts`, {
        method: 'POST',
        body: JSON.stringify({ message })
      });
      
      const data = await response.json();
      
      if (response.ok && data.message && data._id) {
        // Successfully created thought, replace optimistic version
        setThoughts((prev) => 
          prev.map((thought) => 
            thought._id === optimisticThought._id ? data : thought
          )
        );
      } else {
        // Backend returned an error (validation, etc.)
        // Remove optimistic thought
        setThoughts((prev) => 
          prev.filter((thought) => thought._id !== optimisticThought._id)
        );
        
        const errorMessage = data.details || data.error || 'Invalid input';
        if (onError) onError(errorMessage);
      }
      
      setLoading(false);
    } catch (error) {
      // Remove optimistic thought on error
      setThoughts((prev) => 
        prev.filter((thought) => thought._id !== optimisticThought._id)
      );
      
      setLoading(false);
      
      if (error.message === 'Authentication required') {
        // User is not authenticated
        if (onError) onError('Please log in to post a thought');
      } else {
        // Network or other error
        setError('Could not post your thought. Please try again.');
      }
    }
  };

  // Like/unlike a thought (requires authentication) - with optimistic updates
  const handleLike = async (thoughtId) => {
    // Find the current thought to get its current state
    const currentThought = thoughts.find(thought => thought._id === thoughtId);
    if (!currentThought) return;

    // Optimistically update the UI immediately
    const optimisticUpdate = {
      ...currentThought,
      isLikedByUser: !currentThought.isLikedByUser,
      likesCount: currentThought.isLikedByUser 
        ? (currentThought.likesCount || 0) - 1 
        : (currentThought.likesCount || 0) + 1
    };

    setThoughts((prev) =>
      prev.map((thought) =>
        thought._id === thoughtId ? optimisticUpdate : thought
      )
    );

    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const updatedThought = await response.json();
        
        // Update with the actual server response
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === updatedThought._id ? updatedThought : thought
          )
        );
        
        return updatedThought._id;
      } else {
        throw new Error('Failed to update like status');
      }
    } catch (error) {
      // Revert the optimistic update on error
      setThoughts((prev) =>
        prev.map((thought) =>
          thought._id === thoughtId ? currentThought : thought
        )
      );

      if (error.message === 'Authentication required') {
        setError('Please log in to like thoughts.');
      } else {
        setError('Could not like the thought. Please try again.');
      }
      throw error; // Re-throw so calling code can handle it
    }
  };

  // Update a thought (owner only) - with optimistic updates
  const updateThought = async (thoughtId, message) => {
    // Find the current thought to get its current state
    const currentThought = thoughts.find(thought => thought._id === thoughtId);
    if (!currentThought) {
      return { success: false, error: 'Thought not found' };
    }

    // Optimistically update the message
    const optimisticUpdate = {
      ...currentThought,
      message,
      isOptimistic: true
    };

    setThoughts((prev) =>
      prev.map((thought) =>
        thought._id === thoughtId ? optimisticUpdate : thought
      )
    );

    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'PUT',
        body: JSON.stringify({ message })
      });
      
      if (response.ok) {
        const updatedThought = await response.json();
        
        // Update with the actual server response
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === updatedThought._id ? updatedThought : thought
          )
        );
        
        return { success: true, thought: updatedThought };
      } else {
        // Revert optimistic update on error
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === thoughtId ? currentThought : thought
          )
        );

        const errorData = await response.json();
        const errorMessage = errorData.details || errorData.error || 'Failed to update thought';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      // Revert optimistic update on error
      setThoughts((prev) =>
        prev.map((thought) =>
          thought._id === thoughtId ? currentThought : thought
        )
      );

      if (error.message === 'Authentication required') {
        return { success: false, error: 'Please log in to edit thoughts.' };
      } else {
        return { success: false, error: 'Could not update the thought. Please try again.' };
      }
    }
  };

  // Delete a thought (owner only) - with optimistic updates
  const deleteThought = async (thoughtId) => {
    // Find the current thought to store it for potential reversion
    const thoughtToDelete = thoughts.find(thought => thought._id === thoughtId);
    if (!thoughtToDelete) {
      return { success: false, error: 'Thought not found' };
    }

    // Optimistically remove the thought
    setThoughts((prev) => prev.filter((thought) => thought._id !== thoughtId));

    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Success - thought already removed optimistically
        return { success: true };
      } else {
        // Revert optimistic delete on error
        setThoughts((prev) => {
          // Find where to reinsert the thought to maintain order
          const thoughtIndex = prev.findIndex(t => 
            new Date(t.createdAt) < new Date(thoughtToDelete.createdAt)
          );
          
          if (thoughtIndex === -1) {
            // Thought should be at the end
            return [...prev, thoughtToDelete];
          } else {
            // Insert at the correct position
            return [
              ...prev.slice(0, thoughtIndex),
              thoughtToDelete,
              ...prev.slice(thoughtIndex)
            ];
          }
        });

        const errorData = await response.json();
        const errorMessage = errorData.details || errorData.error || 'Failed to delete thought';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      // Revert optimistic delete on error
      setThoughts((prev) => {
        // Find where to reinsert the thought to maintain order
        const thoughtIndex = prev.findIndex(t => 
          new Date(t.createdAt) < new Date(thoughtToDelete.createdAt)
        );
        
        if (thoughtIndex === -1) {
          // Thought should be at the end
          return [...prev, thoughtToDelete];
        } else {
          // Insert at the correct position
          return [
            ...prev.slice(0, thoughtIndex),
            thoughtToDelete,
            ...prev.slice(thoughtIndex)
          ];
        }
      });

      if (error.message === 'Authentication required') {
        return { success: false, error: 'Please log in to delete thoughts.' };
      } else {
        return { success: false, error: 'Could not delete the thought. Please try again.' };
      }
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