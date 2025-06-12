/**
 * Central export file for all Zustand stores
 */

// Authentication store
export { useAuthStore, useAuth } from './authStore';

// Thoughts store
export { useThoughtsStore, useThoughts } from './thoughtsStore';

// UI stores
export { 
  useAppUIStore,
  useThoughtEditingStore, 
  useFormStore, 
  useDeletionStore,
  useThoughtEditing,
  useThoughtDeletion 
} from './uiStore';

// Export store types for future stores
// export { useUIStore, useUI } from './uiStore'; 