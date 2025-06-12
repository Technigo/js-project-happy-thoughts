import { create } from 'zustand';
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
 * Zustand store for managing thoughts state and operations
 */
export const useThoughtsStore = create((set, get) => ({
  // State
  thoughts: [],
  loading: false,
  error: '',

  // Actions
  fetchThoughts: async () => {
    set({ loading: true, error: '' });
    
    try {
      const response = await fetch(`${API_URL}/thoughts?page=1&limit=20`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch thoughts');
      }
      
      const data = await response.json();
      const thoughtsArray = data.thoughts || data;
      const processedThoughts = thoughtsArray.map(processThought);
      set({ thoughts: processedThoughts });
    } catch {
      set({ error: 'Could not load happy thoughts. Please try again later.' });
    } finally {
      set({ loading: false });
    }
  },

  addThought: async (message, onError) => {
    set({ error: '', loading: true });
    
    const optimisticThought = createOptimisticThought(message);
    set((state) => ({ thoughts: [optimisticThought, ...state.thoughts] }));
    
    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts`, {
        method: 'POST',
        body: JSON.stringify({ message })
      });
      
      const data = await response.json();
      
      if (response.ok && data.message && data._id) {
        const processedThought = processThought(data);
        set((state) => ({ thoughts: createReplaceUpdater(optimisticThought._id, processedThought)(state.thoughts) }));
      } else {
        set((state) => ({ thoughts: createRemoveUpdater(optimisticThought._id)(state.thoughts) }));
        const errorMessage = extractErrorMessage(data, 'Invalid input');
        if (onError) onError(errorMessage);
      }
    } catch (error) {
      set((state) => ({ thoughts: createRemoveUpdater(optimisticThought._id)(state.thoughts) }));
      const errorMessage = handleApiError(
        error,
        'Could not post your thought. Please try again.',
        'Please log in to post a thought'
      );
      
      if (error.message === 'Authentication required' && onError) {
        onError(errorMessage);
      } else {
        set({ error: errorMessage });
      }
    } finally {
      set({ loading: false });
    }
  },

  handleLike: async (thoughtId) => {
    const { thoughts } = get();
    const currentThought = thoughts.find(thought => thought._id === thoughtId);
    if (!currentThought) return;

    const optimisticUpdate = createOptimisticLikeUpdate(currentThought);
    set((state) => ({ thoughts: createOptimisticUpdater(thoughtId, () => optimisticUpdate)(state.thoughts) }));

    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}/like`, {
        method: 'POST',
      });
      
      if (response.ok) {
        const updatedThought = await response.json();
        const processedThought = processThought(updatedThought);
        set((state) => ({ thoughts: createReplaceUpdater(updatedThought._id, processedThought)(state.thoughts) }));
        return updatedThought._id;
      } else {
        throw new Error('Failed to update like status');
      }
    } catch (error) {
      set((state) => ({ thoughts: createOptimisticUpdater(thoughtId, () => currentThought)(state.thoughts) }));
      const errorMessage = handleApiError(
        error,
        'Could not like the thought. Please try again.',
        'Please log in to like thoughts.'
      );
      set({ error: errorMessage });
      throw error;
    }
  },

  updateThought: async (thoughtId, message) => {
    const { thoughts } = get();
    const currentThought = thoughts.find(thought => thought._id === thoughtId);
    if (!currentThought) {
      return { success: false, error: 'Thought not found' };
    }

    const optimisticUpdate = { ...currentThought, message, isOptimistic: true };
    set((state) => ({ thoughts: createOptimisticUpdater(thoughtId, () => optimisticUpdate)(state.thoughts) }));

    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'PUT',
        body: JSON.stringify({ message })
      });
      
      if (response.ok) {
        const updatedThought = await response.json();
        const processedThought = processThought(updatedThought);
        set((state) => ({ thoughts: createReplaceUpdater(updatedThought._id, processedThought)(state.thoughts) }));
        return { success: true, thought: processedThought };
      } else {
        set((state) => ({ thoughts: createOptimisticUpdater(thoughtId, () => currentThought)(state.thoughts) }));
        const errorData = await response.json();
        const errorMessage = extractErrorMessage(errorData, 'Failed to update thought');
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      set((state) => ({ thoughts: createOptimisticUpdater(thoughtId, () => currentThought)(state.thoughts) }));
      const errorMessage = handleApiError(
        error,
        'Could not update the thought. Please try again.',
        'Please log in to edit thoughts.'
      );
      return { success: false, error: errorMessage };
    }
  },

  deleteThought: async (thoughtId) => {
    const { thoughts } = get();
    const thoughtToDelete = thoughts.find(thought => thought._id === thoughtId);
    if (!thoughtToDelete) {
      return { success: false, error: 'Thought not found' };
    }

    set((state) => ({ thoughts: createRemoveUpdater(thoughtId)(state.thoughts) }));

    try {
      const response = await authenticatedFetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        return { success: true };
      } else {
        set((state) => ({ thoughts: reinsertThought(state.thoughts, thoughtToDelete) }));
        const errorData = await response.json();
        const errorMessage = extractErrorMessage(errorData, 'Failed to delete thought');
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      set((state) => ({ thoughts: reinsertThought(state.thoughts, thoughtToDelete) }));
      const errorMessage = handleApiError(
        error,
        'Could not delete the thought. Please try again.',
        'Please log in to delete thoughts.'
      );
      return { success: false, error: errorMessage };
    }
  }
}));

/**
 * Hook providing the same interface as the original useThoughts hook
 * This maintains compatibility while using Zustand under the hood
 */
export const useThoughts = () => {
  const store = useThoughtsStore();
  
  // Return the same interface as the original hook
  return {
    thoughts: store.thoughts,
    loading: store.loading,
    error: store.error,
    addThought: store.addThought,
    handleLike: store.handleLike,
    updateThought: store.updateThought,
    deleteThought: store.deleteThought,
    fetchThoughts: store.fetchThoughts
  };
}; 