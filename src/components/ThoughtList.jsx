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

/**
 * Renders a list of thought cards
 */
const ThoughtList = ({ 
  thoughts, 
  onLike, 
  currentUser, 
  onUpdate, 
  onDelete 
}) => {
  return (
    <List>
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought._id}
          _id={thought._id}
          message={thought.message}
          createdAt={thought.createdAt}
          hearts={thought.hearts}
          likesCount={thought.likesCount}
          owner={thought.owner}
          onLike={onLike}
          liked={thought.isLikedByUser} // This will come from backend
          currentUser={currentUser}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isOptimistic={thought.isOptimistic}
        />
      ))}
    </List>
  );
};

export default ThoughtList; 