import styled from 'styled-components';
import Timestamp from './Timestamp';
import Button from './Button';

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

const ThoughtCard = ({ message, createdAt, hearts = 0, _id, onLike }) => {
  return (
    <Card>
      <Message>{message}</Message>
      <CardFooter>
        <Button variant="secondary" onClick={() => onLike(_id)}>
          ❤️ x {hearts}
        </Button>
        <Timestamp date={createdAt} />
      </CardFooter>
    </Card>
  );
};

export default ThoughtCard; 