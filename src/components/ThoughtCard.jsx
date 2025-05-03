import React from "react";

export default function ThoughtCard({ thought, onLike }) {
  const createdAt = new Date(thought.createdAt).toLocaleString();

  return (
    <article className="thought-card">
      <p>{thought.message}</p>
      <div className="thought-footer">
        <button onClick={() => onLike(thought._id)}>
          ❤️ {thought.hearts}
        </button>
        <span>{createdAt}</span>
      </div>
    </article>
  );
}
