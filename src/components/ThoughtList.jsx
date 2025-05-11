import React from 'react';
import ThoughtCard from './ThoughtCard';
import styled from 'styled-components';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
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
