import { handleError, createErrorFromResponse } from './errorHandler';

/**
 * Global logout handler reference - will be set by AuthContext
 */
let globalForceLogout = null;

export const setGlobalLogoutHandler = (logoutHandler) => {
  globalForceLogout = logoutHandler;
};

/**
 * Extracts user information from a JWT token
 */
export const extractUserFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.userId || payload.id || payload.sub;
    const storedEmail = localStorage.getItem('userEmail');
    
    return { 
      _id: userId,
      email: storedEmail || 'user@example.com'
    };
  } catch {
    const storedEmail = localStorage.getItem('userEmail');
    return { 
      _id: 'unknown',
      email: storedEmail || 'user@example.com'
    };
  }
};

/**
 * Clears authentication data from localStorage
 */
export const clearAuthStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
};

/**
 * Saves authentication data to localStorage
 */
export const saveAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userEmail', user.email);
};

/**
 * Authenticated fetch utility that automatically adds Bearer token header
 * and handles common authentication scenarios
 */
export const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    if (response.status === 401) {
      clearAuthStorage();
      
      if (globalForceLogout) {
        globalForceLogout();
      } else {
        window.dispatchEvent(new CustomEvent('auth:logout'));
      }
      
      const error = await createErrorFromResponse(response);
      handleError(error);
      throw error;
    }

    return response;
  } catch (error) {
    if (error.statusCode !== 401) {
      handleError(error);
    }
    throw error;
  }
};

/**
 * Helper function for authenticated API calls that returns JSON
 */
export const authenticatedApiCall = async (url, options = {}) => {
  const response = await authenticatedFetch(url, options);
  
  if (!response.ok) {
    const error = await createErrorFromResponse(response);
    throw error;
  }
  
  return response.json();
}; 