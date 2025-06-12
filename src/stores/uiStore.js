import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * UI State Store for managing component-level state
 * Handles thought editing, form states, and other UI interactions
 */

// App-Level UI Store (with persistence)
export const useAppUIStore = create(
  persist(
    (set) => ({
      // State
      isLoginMode: true, // true = login form, false = signup form
      
      // Actions
      setLoginMode: () => set({ isLoginMode: true }),
      setSignupMode: () => set({ isLoginMode: false }),
      toggleMode: () => set((state) => ({ isLoginMode: !state.isLoginMode }))
    }),
    {
      name: 'app-ui-storage', // Storage key
      partialize: (state) => ({ 
        isLoginMode: state.isLoginMode 
      }) // Only persist the login mode
    }
  )
);

// Thought Editing Store
export const useThoughtEditingStore = create((set, get) => ({
  // State: Map of thoughtId -> editing state
  editingStates: {},
  
  // Actions
  startEditing: (thoughtId, initialMessage) => {
    set((state) => ({
      editingStates: {
        ...state.editingStates,
        [thoughtId]: {
          isEditing: true,
          editMessage: initialMessage,
          isUpdating: false
        }
      }
    }));
  },
  
  updateEditMessage: (thoughtId, message) => {
    set((state) => ({
      editingStates: {
        ...state.editingStates,
        [thoughtId]: {
          ...state.editingStates[thoughtId],
          editMessage: message
        }
      }
    }));
  },
  
  setUpdating: (thoughtId, isUpdating) => {
    set((state) => ({
      editingStates: {
        ...state.editingStates,
        [thoughtId]: {
          ...state.editingStates[thoughtId],
          isUpdating
        }
      }
    }));
  },
  
  cancelEditing: (thoughtId) => {
    set((state) => {
      const newStates = { ...state.editingStates };
      delete newStates[thoughtId];
      return { editingStates: newStates };
    });
  },
  
  finishEditing: (thoughtId) => {
    set((state) => {
      const newStates = { ...state.editingStates };
      delete newStates[thoughtId];
      return { editingStates: newStates };
    });
  },
  
  // Getters
  getEditingState: (thoughtId) => {
    const state = get().editingStates[thoughtId];
    return state || {
      isEditing: false,
      editMessage: '',
      isUpdating: false
    };
  },
  
  isEditingAny: () => {
    return Object.keys(get().editingStates).length > 0;
  }
}));

// Form State Store
export const useFormStore = create((set) => ({
  // Login Form State
  loginForm: {
    email: '',
    password: '',
    error: ''
  },
  
  // Signup Form State
  signupForm: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: ''
  },
  
  // Happy Thought Form State
  thoughtForm: {
    message: '',
    error: ''
  },
  
  // Actions for Login Form
  setLoginField: (field, value) => {
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        [field]: value
      }
    }));
  },
  
  setLoginError: (error) => {
    set((state) => ({
      loginForm: {
        ...state.loginForm,
        error
      }
    }));
  },
  
  resetLoginForm: () => {
    set(() => ({
      loginForm: {
        email: '',
        password: '',
        error: ''
      }
    }));
  },
  
  // Actions for Signup Form
  setSignupField: (field, value) => {
    set((state) => ({
      signupForm: {
        ...state.signupForm,
        [field]: value
      }
    }));
  },
  
  setSignupError: (error) => {
    set((state) => ({
      signupForm: {
        ...state.signupForm,
        error
      }
    }));
  },
  
  resetSignupForm: () => {
    set(() => ({
      signupForm: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
      }
    }));
  },
  
  // Actions for Thought Form
  setThoughtMessage: (message) => {
    set((state) => ({
      thoughtForm: {
        ...state.thoughtForm,
        message
      }
    }));
  },
  
  setThoughtError: (error) => {
    set((state) => ({
      thoughtForm: {
        ...state.thoughtForm,
        error
      }
    }));
  },
  
  resetThoughtForm: () => {
    set(() => ({
      thoughtForm: {
        message: '',
        error: ''
      }
    }));
  }
}));

// Deletion State Store (for managing loading states during deletion)
export const useDeletionStore = create((set, get) => ({
  // State: Set of thoughtIds that are being deleted
  deletingThoughts: new Set(),
  
  // Actions
  startDeleting: (thoughtId) => {
    set((state) => ({
      deletingThoughts: new Set([...state.deletingThoughts, thoughtId])
    }));
  },
  
  finishDeleting: (thoughtId) => {
    set((state) => {
      const newSet = new Set(state.deletingThoughts);
      newSet.delete(thoughtId);
      return { deletingThoughts: newSet };
    });
  },
  
  isDeleting: (thoughtId) => {
    return get().deletingThoughts.has(thoughtId);
  }
}));

// Confirmation Dialog Store
export const useConfirmDialogStore = create((set, get) => ({
  // State
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  onConfirm: null,
  onCancel: null,
  isLoading: false,
  
  // Actions
  showConfirmDialog: ({ title, message, confirmText, cancelText, onConfirm, onCancel }) => {
    set({
      isOpen: true,
      title: title || 'Confirm Action',
      message,
      confirmText: confirmText || 'Confirm',
      cancelText: cancelText || 'Cancel',
      onConfirm,
      onCancel: onCancel || (() => get().hideConfirmDialog()),
      isLoading: false
    });
  },
  
  hideConfirmDialog: () => {
    set({
      isOpen: false,
      title: '',
      message: '',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm: null,
      onCancel: null,
      isLoading: false
    });
  },
  
  setLoading: (loading) => {
    set({ isLoading: loading });
  }
}));

// Convenience hooks for easier component usage
export const useThoughtEditing = (thoughtId) => {
  const store = useThoughtEditingStore();
  const editingState = store.getEditingState(thoughtId);
  
  return {
    ...editingState,
    startEditing: (initialMessage) => store.startEditing(thoughtId, initialMessage),
    updateMessage: (message) => store.updateEditMessage(thoughtId, message),
    setUpdating: (isUpdating) => store.setUpdating(thoughtId, isUpdating),
    cancelEditing: () => store.cancelEditing(thoughtId),
    finishEditing: () => store.finishEditing(thoughtId)
  };
};

export const useThoughtDeletion = (thoughtId) => {
  const store = useDeletionStore();
  
  return {
    isDeleting: store.isDeleting(thoughtId),
    startDeleting: () => store.startDeleting(thoughtId),
    finishDeleting: () => store.finishDeleting(thoughtId)
  };
};

// Custom confirm hook
export const useConfirm = () => {
  const { showConfirmDialog, hideConfirmDialog, setLoading } = useConfirmDialogStore();
  
  return {
    confirm: ({ title, message, confirmText = 'Delete', cancelText = 'Cancel' }) => {
      return new Promise((resolve) => {
        showConfirmDialog({
          title,
          message,
          confirmText,
          cancelText,
          onConfirm: () => {
            setLoading(true);
            setTimeout(() => {
              hideConfirmDialog();
              resolve(true);
            }, 200); // Small delay for UX
          },
          onCancel: () => {
            hideConfirmDialog();
            resolve(false);
          }
        });
      });
    }
  };
}; 