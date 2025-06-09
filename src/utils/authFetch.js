import { handleError, createErrorFromResponse, ERROR_TYPES } from './errorHandler';

/**
 * Global logout handler reference - will be set by AuthContext
 */
let globalForceLogout = null;

export const setGlobalLogoutHandler = (logoutHandler) => {
  globalForceLogout = logoutHandler;
};

/**
 * Authenticated fetch utility that automatically adds Bearer token header
 * and handles common authentication scenarios
 */
export const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  console.log('Using token for request:', token ? `${token.substring(0, 20)}...` : 'No token');
  
  // Prepare headers with authorization if token exists
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

    // Handle 401 Unauthorized responses
    if (response.status === 401) {
      console.log('401 Unauthorized response:', {
        url,
        status: response.status,
        statusText: response.statusText
      });
      
      // Token is likely expired or invalid
      localStorage.removeItem('token');
      
      // Call the global logout handler if available
      if (globalForceLogout) {
        globalForceLogout('Your session has expired. Please log in again.');
      } else {
        // Fallback to custom event
        window.dispatchEvent(new CustomEvent('auth:logout'));
      }
      
      const error = await createErrorFromResponse(response);
      handleError(error, { url, method: options.method || 'GET' });
      throw error;
    }

    return response;
  } catch (error) {
    // If it's not a 401 error, handle other errors
    if (error.statusCode !== 401) {
      handleError(error, { url, method: options.method || 'GET' });
      // For non-401 errors, we can enhance the error but still throw it
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