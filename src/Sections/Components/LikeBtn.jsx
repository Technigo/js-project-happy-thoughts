import React, { useState } from 'react';
import styled from 'styled-components';

const LikeButton = styled.button`
  font-size: 24px;
  background-color: ${(props) => (props.$liked ? '#fdafaf' : '#ebebeb')};
  width: 50px;
  height: 50px;
  border: none;
  padding: 10px;
  margin-top: 10px;
  border-radius: 50%;
  align-self: flex-start;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover span {
    transform: scale(1.2);
    transform-origin: center;
  }
`;

const Heart = styled.span`
  display: inline-block;
  transform-origin: center;
`;

const LikeCount = styled.span`
  font-size: 15px;
  color: #7a7b7b;
  margin-left: 10px;
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

export const LikeBtn = ({ thoughtId, hearts }) => {
  const [likeCount, setLikeCount] = useState(hearts);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    console.log('Sending like to:', thoughtId);

    try {
      const response = await fetch(
        `https://happy-thoughts-api-4ful.onrender.com/thoughts/${thoughtId}/like`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log('Thought liked successfully!');
        setLikeCount(likeCount + 1);
        setLiked(true);
      } else {
        console.error('Failed to like the thought');
      }
    } catch (error) {
      console.error('Error liking the thought:', error);
    }
  };

  return (
    <LikeContainer>
      <LikeButton onClick={handleLike} $liked={liked}>
        <Heart>❤️</Heart>
      </LikeButton>
      <LikeCount>x {likeCount}</LikeCount>
    </LikeContainer>
  );
};
