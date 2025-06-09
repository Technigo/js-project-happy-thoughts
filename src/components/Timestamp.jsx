import styled from 'styled-components';

const Time = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

function getTimeAgo(timestamp) {
  const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  return `${Math.floor(hours / 24)} days ago`;
}

const Timestamp = ({ date }) => <Time>{getTimeAgo(date)}</Time>;

export default Timestamp; 