import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props =>
    props.variant === 'primary'
      ? '#ffb6c1'
      : props.variant === 'circle'
      ? 'none'
      : 'none'};
  border: none;
  border-radius: ${props => (props.variant === 'circle' ? '50%' : '25px')};
  padding: ${props => (props.variant === 'circle' ? '0' : '10px 20px')};
  width: ${props => (props.variant === 'circle' ? '36px' : 'auto')};
  height: ${props => (props.variant === 'circle' ? '36px' : 'auto')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  &:hover {
    background: ${props =>
      props.variant === 'primary'
        ? '#ff99a8'
        : props.variant === 'circle'
        ? '#ffe4ec'
        : '#f0f0f0'};
  }
`;

const Button = ({ children, variant = 'primary', ...rest }) => (
  <StyledButton variant={variant} {...rest}>{children}</StyledButton>
);

export default Button; 