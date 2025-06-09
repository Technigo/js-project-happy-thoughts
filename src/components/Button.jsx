/**
 * Reusable Button component with support for different variants
 * Supports circle variant for like buttons and standard buttons for actions
 */
import styled from "styled-components";

/**
 * Get background color based on button props
 */
const getBackgroundColor = (props) => {
  if (props.$circle) {
    return props.$liked ? "#ffb6c1" : "#fff0f5";
  }
  if (props.disabled) {
    return "#ffb6c1";
  }
  if (props.variant === "primary") {
    return "#ff4d4d";
  }
  return "none";
};

/**
 * Get text color based on button props
 */
const getTextColor = (props) => {
  if (props.$circle) {
    return "white";
  }
  return props.disabled ? "#666" : "white";
};

/**
 * Get hover background color based on button props
 */
const getHoverColor = (props) => {
  if (props.disabled) {
    return "#ffb6c1";
  }
  if (props.variant === "primary") {
    return "#ff3333";
  }
  if (props.variant === "circle") {
    return "#ffe4ec";
  }
  return "#f0f0f0";
};

const StyledButton = styled.button`
  background: ${getBackgroundColor};
  border: none;
  border-radius: ${(props) => (props.$circle ? "50%" : "25px")};
  padding: ${(props) => (props.$circle ? "0" : "10px 20px")};
  width: ${(props) => (props.$circle ? "36px" : "auto")};
  height: ${(props) => (props.$circle ? "36px" : "auto")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getTextColor};
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.2s,
    opacity 0.2s;
  opacity: ${(props) => (props.$circle ? 1 : props.disabled ? 0.7 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background: ${getHoverColor};
  }
`;

/**
 * Button component with customizable styling
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {boolean} props.circle - Whether to render as circular button
 * @param {Object} rest - Additional props passed to button element
 */
const Button = ({ children, circle = false, ...rest }) => (
  <StyledButton $circle={circle} variant="primary" {...rest}>
    {children}
  </StyledButton>
);

export default Button;
