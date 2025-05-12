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

function ThoughtList({ thoughts }) {
  return (
    <ListWrapper>
      {thoughts.map(({ id, text }) => (
        <ThoughtCard key={id} message={text} />
      ))}
    </ListWrapper>
  );
}

export default ThoughtList;
