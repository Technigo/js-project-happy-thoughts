import styled from 'styled-components'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const TimeStyled = styled.span`
  color: #B1B1B1;
  font-size: 0.75rem;
`

const PostCardTime = ({ time }) => {
  return (
    <div>
      <TimeStyled>{dayjs(time).fromNow()}</TimeStyled>
    </div>
  )
}

export default PostCardTime