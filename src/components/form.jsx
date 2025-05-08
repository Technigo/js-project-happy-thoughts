import { useState } from "react"

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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text area
        <input
          type="text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
      </label>
    </form>
  )
}