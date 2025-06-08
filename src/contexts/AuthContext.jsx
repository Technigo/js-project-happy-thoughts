import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { handleError, createErrorFromResponse, ERROR_TYPES } from '../utils/errorHandler';
import { setGlobalLogoutHandler } from '../utils/authFetch';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  // Check if user is authenticated on mount
  useEffect(() => {
    if (token) {
      // If we have a token but no user, try to get user info from a test API call
      // This helps restore the user state after page refresh
      const verifyToken = async () => {
        try {
          const response = await fetch(`${API_URL}/thoughts?limit=1`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.ok) {
            // Token is valid - we could decode it to get user info, but for now
            // we'll just set a minimal user object so the UI works
            if (!user) {
              // Extract email from localStorage if available, or use placeholder
              const storedEmail = localStorage.getItem('userEmail');
              setUser({ 
                email: storedEmail || 'user@example.com', 
                id: 'current-user' 
              });
            }
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.warn('Token verification failed:', error);
          // Keep the token for now, let other parts of the app handle auth errors
        }
      };

      verifyToken();
    }
  }, [token, user]);

  // Set up global logout handler for authFetch
  useEffect(() => {
    setGlobalLogoutHandler(forceLogout);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        return { success: true, user: data.user };
      } else {
        const error = await createErrorFromResponse(response);
        const handledError = handleError(error, { action: 'login', email });
        return { success: false, error: handledError.message, type: handledError.type };
      }
    } catch (error) {
      const handledError = handleError(error, { action: 'login', email });
      return { success: false, error: handledError.message, type: handledError.type };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        return { success: true, user: data.user };
      } else {
        const error = await createErrorFromResponse(response);
        const handledError = handleError(error, { action: 'signup', email });
        return { success: false, error: handledError.message, type: handledError.type };
      }
    } catch (error) {
      const handledError = handleError(error, { action: 'signup', email });
      return { success: false, error: handledError.message, type: handledError.type };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    // Simulate brief loading for UX consistency
    setTimeout(() => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      setLoading(false);
    }, 300);
  };

  const forceLogout = (reason = 'Session expired') => {
    console.warn('Force logout triggered:', reason);
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    // No loading state for force logout as it's immediate
    // You could also show a toast notification here
    // toast.warning(reason);
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    forceLogout,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 