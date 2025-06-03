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

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 1rem;
  color: red;
`;

const formatTimeAgo = (dateString) => {
  const now = new Date();
  const then = new Date(dateString);
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

export const ThoughtCard = ({ thought, onLike, onDelete }) => {
  return (
    <Card>
      <p>{thought.message}</p>
      <Footer>
        <div>
          <LikeButton onClick={() => onLike(thought._id)}>❤️ x {thought.hearts}</LikeButton>
          <DeleteButton onClick={() => onDelete(thought._id)}>🗑</DeleteButton>
        </div>
        <span>{formatTimeAgo(thought.createdAt)}</span>
      </Footer>
    </Card>
  );
};
