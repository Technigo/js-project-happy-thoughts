import styled from 'styled-components';

const Badge = styled.div`
  margin: 10px 0 20px 0;
  padding: 8px 18px;
  background: #ffe4ec;
  color: #d72660;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LikedBadge = ({ count }) => (
  <Badge>
    💖 You have liked <b>{count}</b> different post{count === 1 ? '' : 's'}!
  </Badge>
);

export default LikedBadge; 