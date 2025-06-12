import styled, { keyframes } from "styled-components";
import { LikeButton } from "./LikeButton";
import { getLikedThoughts } from "../utils/localLikes";

const CardFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CardWrapper = styled.section`
  max-width: 450px;
  margin: 5px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  width: 100%;
  border: 1px solid #333333;
  padding: 10px 16px;
  box-shadow: 7px 7px 0px rgb(0, 0, 0);
  margin: 30px 0;
  animation: ${CardFadeIn} 0.5s ease-out;
  word-break: break-word;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const LeftPart = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightPart = styled.div`
  font-size: 14px;
  font-family: Arial, sans-serif;
  color: #333333;
`;

const MessageText = styled.p`
  align-self: start;
  font-weight: 500;
  margin: 0;
  padding-right: 30px;
`;

const Timestamp = styled.small`
  font-size: 14px;
  font-family: arial;
  color: #333333;
  align-self: flex-end;
  margin: 10px;
`;

const getTimeAgo = (date) => {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now - then) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  
  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return `${diffInDays} days ago`;
  }
};

export const MessageCard = ({ message, onLike, onDelete }) => {
  const likedThoughts = getLikedThoughts();
  const isLiked = likedThoughts[message._id];

  return (
    <CardWrapper>
      <Card>
        <MessageText>{message.message}</MessageText>
        <BottomRow>
          <LeftPart>
            <LikeButton
              hearts={message.hearts}
              onClick={() => onLike(message._id)}
              isLiked={isLiked}
            />
            <button onClick={() => onDelete(message._id)}>🗑</button>
          </LeftPart>
          <RightPart>{getTimeAgo(message.createdAt)}</RightPart>
        </BottomRow>
      </Card>
    </CardWrapper>
  );
};
