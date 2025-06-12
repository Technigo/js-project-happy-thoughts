import ThoughtCard from './ThoughtCard';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${colors.text.secondary};
  padding: 20px;
`;

/**
 * Renders a list of thought cards (no pagination controls)
 */
const ThoughtList = ({ 
  thoughts, 
  onLike, 
  currentUser, 
  onUpdate, 
  onDelete,
  loading
}) => {
  return (
    <List>
      {thoughts.length === 0 ? (
        <EmptyState>No thoughts yet. Be the first to share!</EmptyState>
      ) : (
        thoughts.map((thought) => (
          <ThoughtCard
            key={thought._id}
            _id={thought._id}
            message={thought.message}
            createdAt={thought.createdAt}
            hearts={thought.hearts}
            likesCount={thought.likesCount}
            owner={thought.owner}
            onLike={onLike}
            liked={thought.isLikedByUser}
            currentUser={currentUser}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isOptimistic={thought.isOptimistic}
          />
        ))
      )}
    </List>
  );
};

export default ThoughtList; 