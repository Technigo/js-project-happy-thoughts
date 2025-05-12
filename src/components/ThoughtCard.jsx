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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: solid black 1px;
  padding: 1.5rem;
  box-shadow: 12px 12px var(--color-black);
  animation: ${appear} 0.4s ease-out;
`;

const Message = styled.p`
  font-size: 16px;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-dark-grey);
`;

const CardLike = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardTime = styled.p``;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey);
  border-radius: 50%;
  border: none;
  height: 3rem;
  width: 3rem;
  cursor: pointer;

  img {
    width: 1.3rem;
    height: auto;
  }
`;

function ThoughtCard({ message }) {
  return (
    <Card>
      <Message>{message}</Message>
      <CardContent>
        <CardLike>
          <Button>
            <img src='/heart.png' alt='heart emoji' />
          </Button>
          <span>x</span>
          <p>10</p>
        </CardLike>
        <CardTime>15 minutes ago</CardTime>
      </CardContent>
    </Card>
  );
}

export default ThoughtCard;
