/**
 * Validates if an email address has basic email format
 */
export const isValidEmail = (email) => {
  return email.trim() && email.includes('@');
};

/**
 * Validates password strength requirements
 */
export const validatePassword = (password) => {
  const checks = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password)
  };

  const isValid = Object.values(checks).every(check => check);
  
  return { checks, isValid };
};

/**
 * Validates signup form data
 */
export const validateSignupForm = (name, email, password, confirmPassword) => {
  const passwordValidation = validatePassword(password);
  
  return {
    isValid: Boolean(
      name.trim() && 
      isValidEmail(email) && 
      passwordValidation.isValid && 
      confirmPassword.trim() && 
      password === confirmPassword
    ),
    passwordChecks: passwordValidation.checks
  };
};

/**
 * Validates login form data  
 */
export const validateLoginForm = (email, password) => {
  return isValidEmail(email) && password.trim();
};

/**
 * Checks if a user owns a resource
 */
export const isResourceOwner = (currentUser, resourceOwner) => {
  return currentUser && resourceOwner && currentUser._id === resourceOwner._id;
};

/**
 * Shows confirmation dialog and returns user's choice
 */
export const confirmAction = (message) => {
  return window.confirm(message);
};

/**
 * Validates and processes message text for editing
 */
export const processMessageEdit = (newMessage, originalMessage) => {
  const trimmed = newMessage.trim();
  return {
    isValid: trimmed && trimmed !== originalMessage,
    processedMessage: trimmed
  };
}; 