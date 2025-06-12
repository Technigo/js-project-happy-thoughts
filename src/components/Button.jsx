import styled from 'styled-components';
import { colors } from '../styles/colors';

// Use centralized colors instead of local object
const StyledButton = styled.button`
  background: ${colors.primary.main};
  color: ${colors.background.white};
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
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
    cursor: not-allowed;
    transform: none;
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

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export { LikeButton };
export default Button; 