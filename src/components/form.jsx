import { useState } from "react"
import { useEffect } from "react"

export const Form = () => {
  const [answer, setAnswer] = useState("")
  const [showSummary, setShowSummary] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowSummary(true)
  }

  const heartButton = (event) => {
    event.preventDefault();
    setShowSummary(true);
    setAnswer(event.target.value);
  };

  const [thoughts, setThoughts] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch("https://technigo-thoughts.herokuapp.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: answer }),
    })
      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
        setAnswer("");
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Text area
        <input
          type="text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}