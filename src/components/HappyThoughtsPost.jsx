import styled, { keyframes } from "styled-components";
import { LikeComponent } from "./LikeComponent";
import { TimeComponent } from "./TimeComponent";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledDiv = styled.div`
  padding: 1rem;
  border: 1px solid black;
  box-shadow: 8px 8px 0px black;
  animation: ${fadeIn} 1s ease forwards;
`;

const PostsText = styled.p`
  font-family: monospace;
  font-size: 16px;
  word-wrap: break-word;
`;

const PostDetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HappyThoughtsPost = ({ post }) => {
  return (
    <StyledDiv>
      <PostsText>{post.message}</PostsText>
      <PostDetailsWrapper>
        <LikeComponent thoughtId={post._id} initialHearts={post.hearts} />
        <TimeComponent createdAt={post.createdAt} />
      </PostDetailsWrapper>
    </StyledDiv>
  );
};
