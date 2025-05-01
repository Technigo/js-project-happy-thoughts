import ThoughtCard from './ThoughtCard';
import styled from 'styled-components';

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const ThoughtList = ({ thoughts, onLike }) => {
  return (
    <List>
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought.id}
          id={thought.id}
          message={thought.message}
          timestamp={thought.timestamp}
          likes={thought.likes}
          onLike={onLike}
        />
      ))}
    </List>
  );
};

export default ThoughtList; 