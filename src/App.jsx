import React, { useEffect, useState } from "react";
import ThoughtForm from "./components/ThoughtForm";
import ThoughtList from "./components/ThoughtList";
import "./App.css";

const API_URL = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

export default function App() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [likedCount, setLikedCount] = useState(
    () => parseInt(localStorage.getItem("likedCount")) || 0
  );

  useEffect(() => {
    fetchThoughts();
  }, []);

  useEffect(() => {
    localStorage.setItem("likedCount", likedCount);
  }, [likedCount]);

  const fetchThoughts = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setLoading(false);
      });
  };

  const handleNewThought = (newThought) => {
    setThoughts((prev) => [newThought, ...prev]);
  };

  const handleLike = (thoughtId) => {
    fetch(`${API_URL}/${thoughtId}/like`, {
      method: "POST",
    }).then(() => {
      setThoughts((prev) =>
        prev.map((thought) =>
          thought._id === thoughtId
            ? { ...thought, hearts: thought.hearts + 1 }
            : thought
        )
      );
      setLikedCount((prev) => prev + 1);
    });
  };

  return (
    <main className={darkMode ? "dark" : "light"}>
      <div className="header">
        <h1>Happy Thoughts 💬</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <p>You have liked {likedCount} thoughts 💖</p>

      <ThoughtForm onNewThought={handleNewThought} />

      {loading ? (
        <div className="spinner">⏳ Loading happy thoughts...</div>
      ) : (
        <ThoughtList thoughts={thoughts} onLike={handleLike} />
      )}
    </main>
  );
}
