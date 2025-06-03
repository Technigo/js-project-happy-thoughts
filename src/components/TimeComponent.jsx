import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledP = styled.p`
  color: #747272;
`;

const getTimeAgo = (createdAt) => {
  const seconds = Math.floor((Date.now() - new Date(createdAt)) / 1000);
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

export const TimeComponent = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState(getTimeAgo(createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(createdAt));
    }, 10000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return <StyledP>{timeAgo}</StyledP>;
};
