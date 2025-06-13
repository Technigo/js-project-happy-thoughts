import styled from 'styled-components';
import { colors } from '../styles/colors';

// Base button styles
const BaseButton = styled.button`
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    transform: none;
  }
`;

// Default button variant
const StyledButton = styled(BaseButton)`
  background: ${colors.primary.main};
  color: ${colors.background.white};
  padding: 12px 24px;
  font-size: 1rem;
  min-width: 120px;

  &:hover:not(:disabled) {
    background: ${colors.primary.hover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    background: ${colors.primary.active};
    transform: translateY(0);
  }

  &:disabled {
    background: ${colors.state.disabled};
    color: ${colors.text.light};
  }
`;

// Toggle button variant (for FilterToggle components)
const ToggleButton = styled(BaseButton)`
  background: ${props => props.$active ? colors.primary.main : colors.background.light};
  color: ${props => props.$active ? colors.background.white : colors.text.primary};
  border: 1px solid ${colors.border.main};
  padding: 10px 15px;
  font-size: 1.1rem;
  min-width: 45px;
  
  &:hover:not(:disabled) {
    background: ${props => props.$active ? colors.primary.hover : colors.background.light};
  }

  &:disabled {
    background: ${colors.state.disabled};
    color: ${colors.text.light};
    border-color: ${colors.border.light};
  }
`;

// Pagination button variant
const PageButton = styled(BaseButton)`
  background: ${colors.primary.main};
  color: ${colors.background.white};
  min-width: 45px;
  padding: 10px 15px;
  font-size: 1.1rem;
  
  &:hover:not(:disabled) {
    background: ${colors.primary.hover};
  }

  &:active:not(:disabled) {
    background: ${colors.primary.active};
  }

  &:disabled {
    background: ${colors.state.disabled};
    color: ${colors.text.light};
    opacity: 0.5;
  }
`;

const LikeButton = styled.button`
  border: none;
  background: ${props => props.$liked ? colors.primary.main : colors.interactive.likeButton};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }

  &:hover:not(:disabled) {
    transform: scale(1.1);
    background: ${props => {
      if (props.disabled) return props.$liked ? colors.primary.main : colors.interactive.likeButton;
      return props.$liked ? colors.primary.hover : colors.primary.main;
    }};
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
  }
`;

const Button = ({ variant = 'default', children, ...props }) => {
  switch (variant) {
    case 'toggle':
      return <ToggleButton {...props}>{children}</ToggleButton>;
    case 'page':
      return <PageButton {...props}>{children}</PageButton>;
    default:
      return <StyledButton {...props}>{children}</StyledButton>;
  }
};

export { LikeButton, ToggleButton, PageButton };
export default Button; 