import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props =>
    props.$circle
      ? (props.$liked ? '#ffb6c1' : '#fff0f5')
      : props.disabled
      ? '#ffb6c1'
      : props.variant === 'primary'
      ? '#ff4d4d'
      : 'none'};
  border: none;
  border-radius: ${props => (props.$circle ? '50%' : '25px')};
  padding: ${props => (props.$circle ? '0' : '10px 20px')};
  width: ${props => (props.$circle ? '36px' : 'auto')};
  height: ${props => (props.$circle ? '36px' : 'auto')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props =>
    props.$circle
      ? 'white'
      : props.disabled
      ? '#666'
      : 'white'};
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  opacity: ${props =>
    props.$circle
      ? 1
      : props.disabled
      ? 0.7
      : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  &:hover {
    background: ${props =>
      props.disabled
        ? '#ffb6c1'
        : props.variant === 'primary'
        ? '#ff3333'
        : props.variant === 'circle'
        ? '#ffe4ec'
        : '#f0f0f0'};
  }
`;

const Button = ({ children, circle = false, ...rest }) => (
  <StyledButton $circle={circle} variant="primary" {...rest}>{children}</StyledButton>
);

export default Button; 