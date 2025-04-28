import { useState } from "react";

export const Form = () => {
  const [text, setText] = useState('')

  return (
    <form>
      <h2>What's making you happy right now?</h2>
      <input
        type="text"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />

    </form>
  )
}