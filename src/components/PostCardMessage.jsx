import styled from 'styled-components'

const MessageStyled = styled.p`
  overflow-wrap: break-word;
`

const PostCardMessage = ({ message }) => {
  return (
    <div>
      <MessageStyled>{message}</MessageStyled>
    </div>
  )
}

export default PostCardMessage