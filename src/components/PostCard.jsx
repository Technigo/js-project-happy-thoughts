import styled from 'styled-components'
import PostCardLikes from './PostCardLikes'
import PostCardTime from './PostCardTime'
import PostCardMessage from './PostCardMessage'

const PostCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-self: center;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 2px;
  padding: 1rem;
  margin: 2rem;
  box-shadow: 10px 10px 0px 0px rgba(0,0,0,1);
`

const PostCardInfoStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.25rem 0 0.5rem 0;
`

const PostCard = ({ id, message, likes, time }) => {
  return (
    <PostCardStyled>
      <PostCardMessage message={message} />
      <PostCardInfoStyled>
        <PostCardLikes likes={likes} postId={id} /> 
        <PostCardTime time={time} />
      </PostCardInfoStyled>
    </PostCardStyled>
  )
}

export default PostCard