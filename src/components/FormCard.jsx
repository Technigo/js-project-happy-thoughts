import { useState } from "react"
import { SubmitButton } from "./SubmitButton"


export const FormCard = ({ onSubmit }) => {

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const errorHandeling = (message) => {

    if (message.trim() === '') {
      setError('Please write something before submitting.');
      return;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    errorHandeling(error)
    onSubmit(message)
    setMessage('')
  }


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-gray-100 p-5 border rounded-xs shadow-[10px_10px] shadow-black">
        <label>What's making you happy right now?</label>
        <textarea className="resize-none bg-white w-full border-2 border-gray-300"
          onChange={(event) => setMessage(event.target.value)}
          value={message}>
        </textarea>
        {error && ( <p className="text-red-500 text-sm">{error}</p> )}
        <p className="text-xs">Characters aligned left</p>
        <SubmitButton />
      </form>

    </>
  )
}