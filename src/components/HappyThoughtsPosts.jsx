import styled from "styled-components";
import { HappyThoughtsPost } from "./HappyThoughtsPost";
import { LoadingComponent } from "./LoadingComponent";

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HappyThoughtsPosts = ({ posts = [], loading, error }) => {
  if (loading) {
    return <LoadingComponent />;
  }

  if (!posts.length) {
    return <p>No posts yet.</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <PostsContainer>
      {Array.isArray(posts) &&
        posts.map((post) => <HappyThoughtsPost key={post._id} post={post} />)}
    </PostsContainer>
  );
};
