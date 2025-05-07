import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${props => props.variant === 'primary' ? '#ffb6c1' : 'none'};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s, opacity 0.2s;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  &:hover {
    background: ${props => props.variant === 'primary' ? '#ff99a8' : '#f0f0f0'};
  }
`;

const Button = ({ children, variant = 'primary', ...rest }) => (
  <StyledButton variant={variant} {...rest}>{children}</StyledButton>
);

export default Button; 