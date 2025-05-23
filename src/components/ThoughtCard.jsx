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
  background: ${props => props.$liked ? '#fff0f5' : 'none'};
  margin-right: 8px;

  @media (max-width: 320px) {
    width: 36px;
    height: 36px;
    margin-right: 6px;
  }
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

  @media (max-width: 480px) {
    padding: 15px;
    margin-bottom: 15px;
  }

  @media (max-width: 320px) {
    padding: 12px;
    margin-bottom: 12px;
    box-shadow: 4px 4px 0 #000;
  }
`;

const Message = styled.p`
  margin: 0 0 15px 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;

  @media (max-width: 320px) {
    font-size: 0.95rem;
    margin-bottom: 12px;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 320px) {
    gap: 6px;
  }
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 320px) {
    gap: 6px;
  }
`;

const ThoughtCard = ({ message, createdAt, hearts = 0, _id, onLike, liked }) => {
  return (
    <Card>
      <Message>{message}</Message>
      <CardFooter>
        <LeftGroup>
          <LikeButtonWrapper $liked={liked}>
            <Button circle onClick={() => onLike(_id)} disabled={liked} $liked={liked}>
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