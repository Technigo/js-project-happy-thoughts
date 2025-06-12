import styled from 'styled-components';

// Unified color palette for consistent design language
const colors = {
  primary: '#ff4d4d',        // Main action color
  primaryHover: '#ff3333',   // Hover state
  active: '#ff6b6b',         // Active/selected state
  disabled: '#ccc',          // Disabled state
  lightBg: '#f8f8f8',        // Light background for inactive states
  white: '#ffffff',          // White text/background
  darkText: '#666'           // Dark text for disabled states
};

/**
 * Base button component for regular buttons
 */
const BaseButton = styled.button`
  background: ${props => props.disabled ? colors.disabled : colors.primary};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.disabled ? colors.darkText : colors.white};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  opacity: ${props => props.disabled ? 0.7 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background: ${props => props.disabled ? colors.disabled : colors.primaryHover};
  }
`;

/**
 * Circle button component specifically for like buttons
 */
const CircleButton = styled.button`
  background: ${props => props.$liked ? colors.primary : '#ffcccc'};
  border: none;
  border-radius: 50%;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$liked ? colors.white : colors.primary};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  opacity: ${props => props.disabled ? 0.5 : 1};

  &:hover {
    background: ${props => {
      if (props.disabled) return props.$liked ? colors.primary : '#ffcccc';
      return props.$liked ? colors.primaryHover : colors.active;
    }};
    color: colors.white;
  }
`;

/**
 * Regular button component for forms and general actions
 */
const Button = ({ children, ...rest }) => (
  <BaseButton {...rest}>{children}</BaseButton>
);

/**
 * Like button component for heart/like functionality
 */
export const LikeButton = ({ children, liked, ...rest }) => (
  <CircleButton $liked={liked} {...rest}>{children}</CircleButton>
);

export default Button; 