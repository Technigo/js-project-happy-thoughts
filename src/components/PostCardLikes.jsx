import styled from 'styled-components'
import { useState } from 'react'

const HeartStyled = styled.span`
  background-color: ${({ liked }) => liked ? '#FFADAD' : '#EAEAEA'};
  border: none;
  border-radius: 50%;
  padding: 0.625rem;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
`

const LikesStyled = styled.span`
  color: #B1B1B1;
  font-size: 0.75rem;
  margin-left: 0.25rem;
`

const PostCardLikes = ({ likes, postId }) => {

  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(likes)

  const handleLike = async () => {
    if (liked) return
    
    try {
      const url = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${postId}/like`;
      const res = await fetch(url, { method: 'POST' });
    
      if (!res.ok) {
        throw new Error('Failed to like post')
      }
      setLiked(true);
      setLikesCount(likesCount + 1);

    } catch (err) {
      console.error('Error liking post:', err);
    }
  }

  return (
    <div>
      <HeartStyled liked={liked} onClick={handleLike}>❤️</HeartStyled>
      <LikesStyled>x {likesCount}</LikesStyled>
    </div>
  )
}


export default PostCardLikes