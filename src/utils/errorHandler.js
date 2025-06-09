// Global error handler utility
export const ERROR_TYPES = {
  NETWORK: 'NETWORK',
  AUTHENTICATION: 'AUTHENTICATION',
  AUTHORIZATION: 'AUTHORIZATION',
  VALIDATION: 'VALIDATION',
  SERVER: 'SERVER',
  UNKNOWN: 'UNKNOWN'
};

export const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK]: 'Unable to connect to the server. Please check your internet connection and try again.',
  [ERROR_TYPES.AUTHENTICATION]: 'You need to log in to perform this action.',
  [ERROR_TYPES.AUTHORIZATION]: 'You don\'t have permission to perform this action.',
  [ERROR_TYPES.VALIDATION]: 'Please check your input and try again.',
  [ERROR_TYPES.SERVER]: 'Something went wrong on our end. Please try again later.',
  [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred. Please try again.'
};

export class AppError extends Error {
  constructor(type, message, statusCode = null, originalError = null) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.name = 'AppError';
  }
}

export const handleError = (error, context = {}) => {
  console.error('Error occurred:', error, 'Context:', context);
  
  let errorType = ERROR_TYPES.UNKNOWN;
  let userMessage = ERROR_MESSAGES[ERROR_TYPES.UNKNOWN];
  let shouldLogout = false;

  if (error instanceof AppError) {
    errorType = error.type;
    userMessage = error.message;
  } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
    // Network errors
    errorType = ERROR_TYPES.NETWORK;
    userMessage = ERROR_MESSAGES[ERROR_TYPES.NETWORK];
  } else if (error.status || error.statusCode) {
    // HTTP errors
    const status = error.status || error.statusCode;
    
    switch (status) {
      case 401:
        errorType = ERROR_TYPES.AUTHENTICATION;
        userMessage = 'Your session has expired. Please log in again.';
        shouldLogout = true;
        break;
      case 403:
        errorType = ERROR_TYPES.AUTHORIZATION;
        userMessage = ERROR_MESSAGES[ERROR_TYPES.AUTHORIZATION];
        break;
      case 400:
        errorType = ERROR_TYPES.VALIDATION;
        userMessage = error.message || ERROR_MESSAGES[ERROR_TYPES.VALIDATION];
        break;
      case 404:
        userMessage = 'The requested resource was not found.';
        break;
      case 429:
        userMessage = 'Too many requests. Please wait a moment and try again.';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorType = ERROR_TYPES.SERVER;
        userMessage = ERROR_MESSAGES[ERROR_TYPES.SERVER];
        break;
      default:
        userMessage = error.message || ERROR_MESSAGES[ERROR_TYPES.UNKNOWN];
    }
  } else if (error.message) {
    // Use the error message if available
    userMessage = error.message;
  }

  return {
    type: errorType,
    message: userMessage,
    shouldLogout,
    originalError: error
  };
};

export const createErrorFromResponse = async (response) => {
  let errorMessage = `HTTP ${response.status}`;
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorData.error || errorMessage;
  } catch {
    // If we can't parse JSON, use status text
    errorMessage = response.statusText || errorMessage;
  }

  return new AppError(
    ERROR_TYPES.SERVER,
    errorMessage,
    response.status
  );
};

export const withErrorHandling = (asyncFunction) => {
  return async (...args) => {
    try {
      return await asyncFunction(...args);
    } catch (error) {
      const handledError = handleError(error);
      throw new AppError(
        handledError.type,
        handledError.message,
        error.status || error.statusCode,
        error
      );
    }
  };
}; 