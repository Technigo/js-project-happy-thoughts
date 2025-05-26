import React from 'react';
import ThoughtCard from './ThoughtCard';
import styled from 'styled-components';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (min-width: 768px) {
    gap: 4rem;
  }
`;

function ThoughtList({ thoughts, onLike, liking, likeError }) {
  return (
    <ListWrapper>
      {thoughts.map(({ id, text, hearts, createdAt }) => (
        <ThoughtCard
          key={id} // ← Här måste du ha en unik key!
          id={id}
          message={text}
          likes={hearts}
          createdAt={createdAt}
          onLike={onLike}
          liking={liking}
          error={likeError}
        />
      ))}
    </ListWrapper>
  );
}

export default ThoughtList;
