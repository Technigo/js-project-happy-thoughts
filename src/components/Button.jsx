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

  /* Variant-specific styles */
  ${(props) =>
    props.$variant === 'icon' &&
    `
    padding: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props.$isLiked ? '#ffadad' : 'rgb(211, 211, 211)'};

    &:hover {
      background-color: #ff6b6b;
    }
    &:active {
      background-color: #ff3d3d;
    }
  `}

  ${(props) =>
    (props.$variant === 'text' || !props.$variant) &&
    `
    padding: 10px 20px;
    min-width: 120px;
    
    &:hover {
      background-color: var(--color-secondary);
    }
    &:active {
      background-color: var(--color-tertiary);
    }
  `}
`

export const Button = ({
  text,
  icon,
  variant,
  type,
  onClick,
  disabled,
  isLiked
}) => {
  const handleClick = (e) => {
    // Only call onClick if it exists and is a function and button is not disabled
    if (onClick && typeof onClick === 'function' && !disabled) {
      onClick(e)
    }

    // Prevent default action if button is disabled
    if (disabled) {
      e.preventDefault()
    }
  }

  return (
    <StyledButton
      $variant={variant}
      type={type || 'button'}
      onClick={handleClick}
      disabled={disabled}
      $isLiked={isLiked}
    >
      {variant === 'icon' ? icon : text}
    </StyledButton>
  )
}
