import styled from 'styled-components'

const TimeStyled = styled.span`
  color: #B1B1B1;
  font-size: 0.75rem;
`

const PostCardTime = ({ time }) => {
  return (
    <div>
      <TimeStyled>{time}</TimeStyled>
    </div>
  )
}

export default PostCardTime