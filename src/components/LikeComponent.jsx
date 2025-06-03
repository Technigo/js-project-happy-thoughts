import { useState } from "react";
import styled from "styled-components";

const LikeButton = styled.button`
  background-color: ${(props) => (props.$liked ? "#ffcccb" : "#f0eeee")};
  width: 48px;
  height: 48px;
  border-radius: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const NumberOfLikes = styled.p`
  color: #747272;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LikeComponent = ({ thoughtId, initialHearts }) => {
  const [likes, setLikes] = useState(initialHearts);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(
        `https://happy-thoughts-api-4ful.onrender.com/thoughts/${thoughtId}/like`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like thought");
      }

      setLikes((prev) => prev + 1);
      setIsLiked(true); // valfritt
    } catch (error) {
      console.error("Failed to like thought:", error);
    }
  };

  return (
    <LikeWrapper>
      <LikeButton onClick={handleLike} $liked={isLiked}>
        ❤️
      </LikeButton>
      <NumberOfLikes>x {likes}</NumberOfLikes>
    </LikeWrapper>
  );
};
