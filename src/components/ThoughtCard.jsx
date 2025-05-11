import React from 'react';
import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  animation: ${appear} 0.4s ease-out;
`;

function ThoughtCard({ message }) {
  return <Card>{message}</Card>;
}

export default ThoughtCard;
