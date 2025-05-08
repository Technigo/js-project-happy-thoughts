import { useState } from "react";

const MAX_LENGTH = 140;
const MIN_LENGTH = 5;

const ThoughtInput = ({ onAddThought }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const charsLeft = MAX_LENGTH - text.length;

  const handleInput = (event) => {
    setText(event.target.value);
    setError("");

    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) {
      setError("Please enter a happy thought!");
      return;
    }
    if (text.trim().length < MIN_LENGTH) {
      setError("Your thought is too short!");
      return;
    }
    if (text.trim().length > MAX_LENGTH) {
      setError("Your thought is too long!");
      return;
    }
    onAddThought(text.trim());
    setText("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#F2F0F0] border-2 rounded-sm shadow-solid-offset p-4 mb-8 max-w-lg w-full mx-auto"
    >
      <label className="block mb-2 font-semibold text-[#333]">
        What's making you happy right now?
      </label>

      <textarea
        className="bg-[#FFFFFF] w-full border-2 rounded-sm p-2 font-mono mb-2 resize-none"
        rows={2}
        value={text}
        onInput={handleInput}
        placeholder="Type your happy thought here..."
        maxLength={MAX_LENGTH + 10}
        style={{ overflow: "hidden" }}
      />

      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-sm ${charsLeft < 0 ? "text-red-500" : "text-gray-400"}`}
        >
          {charsLeft} characters left
        </span>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-pink-400 to-pink-300 text-white font-semibold rounded-full px-6 py-2 shadow flex items-center gap-2 mx-auto hover:from-pink-500 hover:to-pink-400 transition disabled:opacity-50"
      >
        <span role="img" aria-label="heart">❤️</span>
        Send Happy Thought
        <span role="img" aria-label="heart">❤️</span>
      </button>
    </form>
  );
};

export default ThoughtInput;