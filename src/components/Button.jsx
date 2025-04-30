import React from 'react'
import styled from 'styled-components'

// Styled button component
export const StyledButton = styled.button`
  background-color: #ffadad;
  color: black;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  padding: 10px;
  margin: 12px 0;

  /* Apply variant-specific styles */
  ${(props) =>
    props.variant === 'icon' &&
    `
    padding: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `}

  ${(props) =>
    props.variant === 'text' || !props.variant
      ? `
    padding: 10px 20px;
    min-width: 120px;
  `
      : ''}

  &:hover {
    background-color: #ff6b6b;
  }
  &:active {
    background-color: #ff3d3d;
  }
  &:focus {
    outline: none;
  }
`

export const Button = ({ text, icon, variant, type, onClick, disabled }) => {
  const handleClick = (e) => {
    // Only call onClick if it exists and is a function
    if (onClick && typeof onClick === 'function') {
      onClick(e)
    }
  }
  return (
    <StyledButton
      variant={variant}
      type={type || 'button'}
      onClick={handleClick}
      disabled={disabled}
    >
      {variant === 'icon' ? icon : text}
    </StyledButton>
  )
}
