import { useState } from "react"
import SubmitButton from "../components/SubmitButton"

const FormCard = ({ onMessageSubmission }) => {
  const [message, setMessage] = useState("")
  const [characters, setCharacters] = useState(0)
  const maxCharacters = 140
  const minCharacters = 5

  const handleTyping = (event) => {
    setMessage(event.target.value)
    setCharacters(event.target.value.length)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onMessageSubmission(message)
    setMessage("")
    setCharacters(0)
  }

  return (
    <article
      className="bg-(--color-secondary) border border-black border-solid shadow-[10px_10px] shadow-black p-5"
    >
      <form
        className="flex flex-col items-start gap-3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="thoughtInput">What's making you happy right now?</label>
        <textarea
          id="thoughtInput"
          className="bg-white border border-gray-400 w-full p-2 font-mono resize-none focus:outline-(--color-accent)"
          placeholder="Share your happy thought!"
          onChange={handleTyping}
          value={message}
          maxLength={maxCharacters}
        />
        <p
          className={`font-mono text-xs ${characters < maxCharacters ? 'text-[#464646]' : 'text-[#ff0000]'} self-end -mt-2 mb-1`}
        >
          {characters}/{maxCharacters} characters
        </p>
        <SubmitButton isActive={message.length >= minCharacters ? true : false} />
      </form>
    </article>
  )
}

export default FormCard