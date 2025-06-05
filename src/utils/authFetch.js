/**
 * Authenticated fetch utility that automatically adds Bearer token header
 * and handles common authentication scenarios
 */
export const authenticatedFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
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
      // Token is likely expired or invalid
      localStorage.removeItem('token');
      // Optionally trigger a logout in the app
      window.dispatchEvent(new CustomEvent('auth:logout'));
      throw new Error('Authentication required');
    }

    return response;
  } catch (error) {
    // Re-throw the error so calling code can handle it
    throw error;
  }
};

/**
 * Helper function for authenticated API calls that returns JSON
 */
export const authenticatedApiCall = async (url, options = {}) => {
  const response = await authenticatedFetch(url, options);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.details || errorData.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}; 