import { useState, useEffect } from 'react'
import CreatePostCard from './components/CreatePostCard'
import PostCard from './components/PostCard'
import styled from 'styled-components'

const AppWrapper = styled.div`
  padding: 2rem;
  font-family: "Inter", sans-serif;
`

const PostWrapper = styled.div`
  margin-top: 1rem;
`

const LoadingStyled = styled.p`
  text-align: center;
  margin: 3rem;
`

export const App = () => {

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts';
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts(data);
    } catch (err) {
        console.error('Error fetching posts:', err)
    } finally {
        setLoading(false);
    }
  }

  useEffect(()=> {
    fetchPosts();
  }, [])

  const handleSubmit = async () => {
    if (message.trim() === '') return

    try {
      const url = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      if (!res.ok) {
        throw new Error('Failed to post message')
      }

      const newPost = await res.json()
      
      setPosts([newPost, ...posts]);
      setMessage('');

    } catch (err) {
      console.error('Error posting message:', err);
    }
  }

  return (
    <AppWrapper>
      <CreatePostCard
      message={message} 
      setMessage={setMessage} 
      onSubmit={handleSubmit} 
      />
      <PostWrapper>
        {loading ? (
          <LoadingStyled>Loading happy thoughts...</LoadingStyled>
        ) : (
          posts.map(post => (
            <PostCard
              key={post._id}
              id={post._id}
              message={post.message}
              likes={post.hearts}
              time={new Date(post.createdAt).toLocaleString()} 
            />
          ))
        )}
      </PostWrapper>
    </AppWrapper>
  )
}

export default App