import React, { useState } from "react";

const API_URL = 'https://happy-thoughts-api-4ful.onrender.com/thoughts';

export default function ThoughtForm({ onNewThought }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.length < 5 || message.length > 140) {
      setError("Your message must be between 5 and 140 characters.");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        onNewThought(data);
        setMessage("");
        setError("");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="thought-form">
      <h2>What's making you happy right now?</h2>
      <textarea
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a happy thought..."
      />
      <div className="form-footer">
        <span className={message.length > 140 ? "char-limit red" : "char-limit"}>
          {message.length}/140
        </span>
        <button type="submit" disabled={message.length < 5 || message.length > 140}>
          ❤️ Send Happy Thought
        </button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </form>
  );
}
