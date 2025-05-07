import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Message = styled.p`
  margin: 0 0 15px 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Timestamp = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ThoughtCard = ({ message, createdAt, hearts = 0, _id, onLike }) => {
  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <Card>
      <Message>{message}</Message>
      <CardFooter>
        <LikeButton onClick={() => onLike(_id)}>
          ❤️ x {hearts}
        </LikeButton>
        <Timestamp>{getTimeAgo(createdAt)}</Timestamp>
      </CardFooter>
    </Card>
  );
};

export default ThoughtCard; 