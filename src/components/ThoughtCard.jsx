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
  padding: 1rem;
  box-shadow: 12px 12px var(--color-black);
  animation: ${appear} 0.4s ease-out;
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
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey);
  border-radius: 50%;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
  cursor: pointer;

  span {
    margin-top: 4%;
    display: inline-block;
    padding: none;
    line-height: 0;
    padding: 0%;
  }
`;

function ThoughtCard({ message }) {
  return (
    <Card>
      {message}
      <CardContent>
        <CardLike>
          <Button>
            <span>{'\u2764\uFE0F'}</span>
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
