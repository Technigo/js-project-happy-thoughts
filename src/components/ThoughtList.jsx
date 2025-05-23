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

const ThoughtList = ({ thoughts, onLike, likedThoughtIds = [] }) => {
  return (
    <List>
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          _id={thought._id}
          message={thought.message}
          createdAt={thought.createdAt}
          hearts={thought.hearts}
          onLike={onLike}
          liked={likedThoughtIds.includes(thought._id)}
        />
      ))}
    </List>
  );
};

export default ThoughtList; 