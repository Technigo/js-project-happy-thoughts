/**
 * Centralized Color Palette for Happy Thoughts App
 * 
 * This file contains all colors used throughout the application.
 * Import and use these instead of hardcoded values for consistency and maintainability.
 * 
 * Usage: import { colors } from '../styles/colors';
 * Then use: color: ${colors.text.primary}
 */

export const colors = {
  // Primary brand colors
  primary: {
    main: '#ff4d4d',        // Main brand color - buttons, links, focus states
    hover: '#ff3333',       // Hover state for primary elements
    active: '#ff6b6b',      // Active/selected state
    dark: '#cc0000',        // Darker variant for borders, emphasis
  },

  // Text colors
  text: {
    primary: '#333',        // Main text color
    secondary: '#666',      // Secondary text, labels, metadata
    muted: '#888',          // Loading text, disabled text
    placeholder: '#999',    // Placeholder text, optimistic states
    light: '#666',          // Light text for disabled states
  },

  // Background colors
  background: {
    white: '#ffffff',       // Main background, cards, modals
    light: '#f5f5f5',       // Form backgrounds, neutral containers
    lightest: '#f8f8f8',    // Very light backgrounds
    userInfo: '#f9f9f9',    // User info containers
    requirements: '#f9f9f9', // Password requirements background
    cancel: '#e9e9e9',      // Cancel button hover
  },

  // Border colors
  border: {
    main: '#bbb',           // Main border color - cards, forms, modals
    light: '#ddd',          // Light borders - inputs, containers
    focus: '#ff4d4d',       // Focus state borders (same as primary)
    accent: '#ddd',         // Accent borders for requirements
  },

  // State colors
  state: {
    error: '#ff4444',       // Error messages, validation
    success: '#4CAF50',     // Success states, valid inputs
    disabled: '#ccc',       // Disabled button background
  },

  // Interactive colors
  interactive: {
    likedBackground: '#fff0f5',  // Background for liked thoughts
    likeButton: '#ffcccc',       // Unlike button background
    shadow: '#000',              // Box shadow color
  },

  // Overlay and modal colors
  overlay: {
    backdrop: 'rgba(0, 0, 0, 0.5)',    // Modal backdrop
    shadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Form shadows
    cardShadow: '6px 6px 0 #000',           // Card box shadow
    cardShadowSmall: '4px 4px 0 #000',      // Card box shadow on mobile
    modalShadow: '8px 8px 0 #000',          // Modal box shadow
  }
};

// Export individual color groups for convenience
export const { primary, text, background, border, state, interactive, overlay } = colors;

// Common color combinations for reuse
export const colorCombos = {
  // Form styling
  formContainer: {
    background: background.light,
    border: `2px solid ${border.main}`,
    boxShadow: overlay.shadow,
  },
  
  // Input styling
  input: {
    border: `1px solid ${border.light}`,
    focusBorder: border.focus,
  },
  
  // Card styling
  card: {
    background: background.white,
    border: `1px solid ${border.main}`,
    boxShadow: overlay.cardShadow,
    boxShadowSmall: overlay.cardShadowSmall,
  },
  
  // Button styling
  primaryButton: {
    background: primary.main,
    color: background.white,
    hoverBackground: primary.hover,
  },
  
  // Cancel button styling
  cancelButton: {
    background: background.light,
    color: text.secondary,
    border: `1px solid ${border.light}`,
    hoverBackground: background.cancel,
    hoverColor: text.primary,
  },
  
  // Delete button styling
  deleteButton: {
    background: primary.main,
    color: background.white,
    border: `1px solid ${primary.dark}`,
    hoverBackground: primary.hover,
  },
  
  // Modal styling
  modal: {
    background: background.white,
    border: `2px solid ${border.main}`,
    boxShadow: overlay.modalShadow,
    overlay: overlay.backdrop,
  }
};

export default colors;