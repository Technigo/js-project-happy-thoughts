import { useState, useEffect } from "react";
import styled from "styled-components";
import { HappyThoughtsForm } from "./components/HappyThoughtsForm";
import { HappyThoughtsPosts } from "./components/HappyThoughtsPosts";

const AppContainer = styled.section`
  width: 100%;
  max-width: 800px;
  padding: 1rem;
  margin: 0 auto;

  @media (min-width: 667px) {
    padding: 4rem;
  }
`;

const API_URL = "https://happy-thoughts-api-4ful.onrender.com/thoughts";

export const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve));
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) throw new Error("Fetch error");
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Could not load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = (message) => {
    const newPost = {
      _id: Date.now().toString(),
      message,
      hearts: 0,
      createdAt: new Date().toISOString(),
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <AppContainer>
      <HappyThoughtsForm onSubmit={addPost} />
      <HappyThoughtsPosts posts={posts} loading={loading} error={error} />
    </AppContainer>
  );
};
