import styled from "styled-components";
import { HeartIcon } from "./HeartIcon";

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const HeartWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.$liked ? "#FFA6B2" : "#eaeaea")};

  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
`;

const LikeCount = styled.span`
  font-size: 14px;
  color: #333333;
  font-family: Arial, sans-serif;
`;

export const LikeButton = ({ hearts, onClick, isLiked }) => {
  return (
    <LikeContainer>
      <HeartWrapper
        type="button"
        onClick={onClick}
        $liked={isLiked}
        aria-label="Like this message"
        title="Like"
      >
        <HeartIcon size="20px" aria-hidden="true" />
      </HeartWrapper>
      <LikeCount>x {hearts}</LikeCount>
    </LikeContainer>
  );
};
