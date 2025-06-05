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

  // Add a new thought (requires authentication)
  const addThought = async (message, onError) => {
    setError('');
    setLoading(true);
    
    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts`, {
        method: 'POST',
        body: JSON.stringify({ message })
      });
      
      const data = await response.json();
      
      if (response.ok && data.message && data._id) {
        // Successfully created thought, add to top of list
        setThoughts((prev) => [data, ...prev]);
      } else {
        // Backend returned an error (validation, etc.)
        const errorMessage = data.details || data.error || 'Invalid input';
        if (onError) onError(errorMessage);
      }
      
      setLoading(false);
    } catch (error) {
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

  // Like/unlike a thought (requires authentication)
  const handleLike = async (thoughtId) => {
    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const updatedThought = await response.json();
        
        // Update the thought in our local state with new like count and status
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
      if (error.message === 'Authentication required') {
        setError('Please log in to like thoughts.');
      } else {
        setError('Could not like the thought. Please try again.');
      }
      throw error; // Re-throw so calling code can handle it
    }
  };

  // Update a thought (owner only)
  const updateThought = async (thoughtId, message) => {
    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'PUT',
        body: JSON.stringify({ message })
      });
      
      if (response.ok) {
        const updatedThought = await response.json();
        
        // Update the thought in our local state
        setThoughts((prev) =>
          prev.map((thought) =>
            thought._id === updatedThought._id ? updatedThought : thought
          )
        );
        
        return { success: true, thought: updatedThought };
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details || errorData.error || 'Failed to update thought';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      if (error.message === 'Authentication required') {
        return { success: false, error: 'Please log in to edit thoughts.' };
      } else {
        return { success: false, error: 'Could not update the thought. Please try again.' };
      }
    }
  };

  // Delete a thought (owner only)
  const deleteThought = async (thoughtId) => {
    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        // Remove the thought from our local state
        setThoughts((prev) => prev.filter((thought) => thought._id !== thoughtId));
        
        return { success: true };
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details || errorData.error || 'Failed to delete thought';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
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