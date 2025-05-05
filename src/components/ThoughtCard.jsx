import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Card = styled.article`
  background: white;
  border: 1px solid black;
  box-shadow: 4px 4px 0 pink;
  padding: 1rem;
  margin-bottom: 1.5rem;
  animation: ${fadeInSlideUp} 0.4s ease-in-out;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const LikeButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

export const ThoughtCard = ({ thought, onLike }) => {
  const minutesAgo = Math.floor((Date.now() - new Date(thought.createdAt)) / 60000);

  return (
    <Card>
      <p>{thought.message}</p>
      <Footer>
        <LikeButton onClick={() => onLike(thought._id)}>❤️ x {thought.hearts}</LikeButton>
        <span>{minutesAgo} minutes ago</span>
      </Footer>
    </Card>
  );
};
