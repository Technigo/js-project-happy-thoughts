import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../config/api';
import { handleError, createErrorFromResponse } from '../utils/errorHandler';
import { setGlobalLogoutHandler, extractUserFromToken, clearAuthStorage, saveAuthData } from '../utils/authUtils';

const AuthContext = createContext();

/**
 * Custom hook to access authentication context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Authentication context provider component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      const verifyToken = async () => {
        try {
          const response = await fetch(`${API_URL}/thoughts?limit=1`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.ok) {
            setUser(extractUserFromToken(token));
          } else {
            clearAuthStorage();
            setToken(null);
            setUser(null);
          }
        } catch {
          // Keep token for now, let other parts handle auth errors
        }
      };

      verifyToken();
    }
  }, [token, user]);

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
        const authToken = data.accessToken || data.token;
        
        setToken(authToken);
        setUser(data.user);
        saveAuthData(authToken, data.user);
        
        return { success: true, user: data.user };
      } else {
        const error = await createErrorFromResponse(response);
        const handledError = handleError(error);
        return { success: false, error: handledError.message, type: handledError.type };
      }
    } catch (error) {
      const handledError = handleError(error);
      return { success: false, error: handledError.message, type: handledError.type };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        const authToken = data.accessToken || data.token;
        
        setToken(authToken);
        setUser(data.user);
        saveAuthData(authToken, data.user);
        
        return { success: true, user: data.user };
      } else {
        const error = await createErrorFromResponse(response);
        const handledError = handleError(error);
        return { success: false, error: handledError.message, type: handledError.type };
      }
    } catch (error) {
      const handledError = handleError(error);
      return { success: false, error: handledError.message, type: handledError.type };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      setToken(null);
      setUser(null);
      clearAuthStorage();
      setLoading(false);
    }, 300);
  };

  const forceLogout = () => {
    setToken(null);
    setUser(null);
    clearAuthStorage();
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