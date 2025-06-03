import React from 'react';
import { ThoughtCard } from './ThoughtCard';

export const ThoughtList = ({ thoughts, onLike }) => {
  return (
    <section>
      {thoughts.map((thought) => (
        <ThoughtCard key={thought._id} thought={thought} onLike={onLike} />
      ))}
    </section>
  );
};
