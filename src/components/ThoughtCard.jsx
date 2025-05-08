import styled from 'styled-components';
import Timestamp from './Timestamp';
import Button from './Button';

const LikeButtonWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.$liked ? '#ffb6c1' : '#fff0f5'};
  margin-right: 8px;
`;

const Card = styled.div`
  background: white;
  border-radius: 0;
  border: 1px solid #bbb;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 6px 6px 0 #000;
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

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ThoughtCard = ({ message, createdAt, hearts = 0, _id, onLike, liked }) => {
  return (
    <Card>
      <Message>{message}</Message>
      <CardFooter>
        <LeftGroup>
          <LikeButtonWrapper $liked={liked}>
            <Button circle onClick={() => onLike(_id)}>
              ❤️
            </Button>
          </LikeButtonWrapper>
          <span>x {hearts}</span>
        </LeftGroup>
        <Timestamp date={createdAt} />
      </CardFooter>
    </Card>
  );
};

export default ThoughtCard; 