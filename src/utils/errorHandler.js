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

/**
 * Custom error class with type and status information
 */
export class AppError extends Error {
  constructor(type, message, statusCode = null, originalError = null) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.name = 'AppError';
  }
}

const getHttpErrorDetails = (status, error) => {
  switch (status) {
    case 401:
      return {
        type: ERROR_TYPES.AUTHENTICATION,
        message: 'Your session has expired. Please log in again.',
        shouldLogout: true
      };
    case 403:
      return {
        type: ERROR_TYPES.AUTHORIZATION,
        message: ERROR_MESSAGES[ERROR_TYPES.AUTHORIZATION],
        shouldLogout: false
      };
    case 400:
      return {
        type: ERROR_TYPES.VALIDATION,
        message: error.message || ERROR_MESSAGES[ERROR_TYPES.VALIDATION],
        shouldLogout: false
      };
    case 404:
      return {
        type: ERROR_TYPES.UNKNOWN,
        message: 'The requested resource was not found.',
        shouldLogout: false
      };
    case 429:
      return {
        type: ERROR_TYPES.UNKNOWN,
        message: 'Too many requests. Please wait a moment and try again.',
        shouldLogout: false
      };
    case 500:
    case 502:
    case 503:
    case 504:
      return {
        type: ERROR_TYPES.SERVER,
        message: ERROR_MESSAGES[ERROR_TYPES.SERVER],
        shouldLogout: false
      };
    default:
      return {
        type: ERROR_TYPES.UNKNOWN,
        message: error.message || ERROR_MESSAGES[ERROR_TYPES.UNKNOWN],
        shouldLogout: false
      };
  }
};

/**
 * Handles errors and returns standardized error information
 */
export const handleError = (error) => {
  if (error instanceof AppError) {
    return {
      type: error.type,
      message: error.message,
      shouldLogout: false,
      originalError: error
    };
  }

  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return {
      type: ERROR_TYPES.NETWORK,
      message: ERROR_MESSAGES[ERROR_TYPES.NETWORK],
      shouldLogout: false,
      originalError: error
    };
  }

  if (error.status || error.statusCode) {
    const status = error.status || error.statusCode;
    const details = getHttpErrorDetails(status, error);
    
    return {
      ...details,
      originalError: error
    };
  }

  return {
    type: ERROR_TYPES.UNKNOWN,
    message: error.message || ERROR_MESSAGES[ERROR_TYPES.UNKNOWN],
    shouldLogout: false,
    originalError: error
  };
};

/**
 * Creates an AppError from a failed HTTP response
 */
export const createErrorFromResponse = async (response) => {
  let errorMessage = `HTTP ${response.status}`;
  
  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorData.error || errorMessage;
  } catch {
    errorMessage = response.statusText || errorMessage;
  }

  return new AppError(
    ERROR_TYPES.SERVER,
    errorMessage,
    response.status
  );
}; 