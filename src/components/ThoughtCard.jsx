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
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  img {
    width: 1.3rem;
    height: auto;
  }
`;

function ThoughtCard({ id, message, likes, createdAt, onLike, liking, error }) {
  const date = new Date(createdAt);
  const formatted = date.toLocaleString('sv-SE', {
    weekday: 'long', // veckodag, t.ex. "fredag"
    hour: '2-digit', // tvåsiffrig timme
    minute: '2-digit', // tvåsiffrig minut
    hour12: false, // 24-timarsformat
  });
  // Kapitalisera första bokstaven:
  const display = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  return (
    <Card>
      <Message>{message}</Message>
      <CardContent>
        <CardLike>
          <Button onClick={() => onLike(id)} disabled={liking}>
            <img src='/heart.png' alt='heart emoji' />
          </Button>
          <span>x</span>
          <span>{likes}</span>
        </CardLike>
        <CardTime>{display}</CardTime>
      </CardContent>
      {error && <ErrorMsg>Gilla misslyckades</ErrorMsg>}
    </Card>
  );
}

export default ThoughtCard;
