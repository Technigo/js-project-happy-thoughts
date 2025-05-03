import React from "react";
import ThoughtCard from "./ThoughtCard";

export default function ThoughtList({ thoughts, onLike }) {
  return (
    <section className="thought-list">
      {thoughts.map((thought) => (
        <ThoughtCard key={thought._id} thought={thought} onLike={onLike} />
      ))}
    </section>
  );
}
