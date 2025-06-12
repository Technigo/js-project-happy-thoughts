import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_URL } from '../config/api';
import { handleError, createErrorFromResponse } from '../utils/errorHandler';
import { setGlobalLogoutHandler, extractUserFromToken, clearAuthStorage, saveAuthData } from '../utils/authUtils';

/**
 * Zustand Authentication Store
 * Replaces AuthContext with better performance and cleaner state management
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: localStorage.getItem('token'),
      loading: false,
      
      // Computed state
      isAuthenticated: () => !!get().token,
      
      // Actions
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      
      // Initialize auth state (replaces useEffect logic)
      initializeAuth: async () => {
        const { token, user } = get();
        
        if (token && !user) {
          try {
            const response = await fetch(`${API_URL}/thoughts?limit=1`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            if (response.ok) {
              const extractedUser = extractUserFromToken(token);
              set({ user: extractedUser });
            } else {
              // Token is invalid, clear auth
              get().forceLogout();
            }
          } catch {
            // Keep token for now, let other parts handle auth errors
          }
        }
        
        // Set global logout handler
        setGlobalLogoutHandler(get().forceLogout);
      },
      
      // Login action
      login: async (email, password) => {
        set({ loading: true });
        
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          
          if (response.ok) {
            const data = await response.json();
            const authToken = data.accessToken || data.token;
            
            set({ 
              token: authToken, 
              user: data.user,
              loading: false 
            });
            
            saveAuthData(authToken, data.user);
            
            return { success: true, user: data.user };
          } else {
            const error = await createErrorFromResponse(response);
            const handledError = handleError(error);
            set({ loading: false });
            return { 
              success: false, 
              error: handledError.message, 
              type: handledError.type 
            };
          }
        } catch (error) {
          const handledError = handleError(error);
          set({ loading: false });
          return { 
            success: false, 
            error: handledError.message, 
            type: handledError.type 
          };
        }
      },
      
      // Signup action
      signup: async (name, email, password) => {
        set({ loading: true });
        
        try {
          const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
          });
          
          if (response.ok) {
            const data = await response.json();
            const authToken = data.accessToken || data.token;
            
            set({ 
              token: authToken, 
              user: data.user,
              loading: false 
            });
            
            saveAuthData(authToken, data.user);
            
            return { success: true, user: data.user };
          } else {
            const error = await createErrorFromResponse(response);
            const handledError = handleError(error);
            set({ loading: false });
            return { 
              success: false, 
              error: handledError.message, 
              type: handledError.type 
            };
          }
        } catch (error) {
          const handledError = handleError(error);
          set({ loading: false });
          return { 
            success: false, 
            error: handledError.message, 
            type: handledError.type 
          };
        }
      },
      
      // Logout action (with delay for UX)
      logout: () => {
        set({ loading: true });
        setTimeout(() => {
          set({ 
            token: null, 
            user: null, 
            loading: false 
          });
          clearAuthStorage();
        }, 300);
      },
      
      // Force logout (immediate, for auth errors)
      forceLogout: () => {
        set({ 
          token: null, 
          user: null, 
          loading: false 
        });
        clearAuthStorage();
      }
    }),
    {
      name: 'auth-storage', // Storage key
      partialize: (state) => ({ 
        token: state.token 
      }), // Only persist the token
    }
  )
);

// Selectors for easier component access
export const useAuth = () => {
  const store = useAuthStore();
  return {
    user: store.user,
    token: store.token,
    loading: store.loading,
    isAuthenticated: store.isAuthenticated(),
    login: store.login,
    signup: store.signup,
    logout: store.logout,
    forceLogout: store.forceLogout,
    initializeAuth: store.initializeAuth
  };
};

// Note: initializeAuth should be called by the App component in a useEffect 