import { useState } from "react"
import { SubmitButton } from "./SubmitButton"


export const FormCard = ({ onSubmit }) => {

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [count, setCount] = useState(0)
  const maxChars = 60

  const validateMessage = (text) => {

    if (text.trim() === '') {
      setError('Please write something before submitting.')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateMessage(message)) {
      return
    }

    onSubmit(message)
    //Reset
    setMessage('');
    setCount(0);
    setError('');
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setMessage(newValue)

    if (error) {
      setError('')
    }
    setCount(newValue.length)
    if (newValue.length >= maxChars) {
      setError(`Only ${maxChars} is aloud`)
    }
  }



  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-gray-100 p-5 border rounded-xs shadow-[10px_10px] shadow-black">
        <label>What's making you happy right now?</label>
        <textarea className="resize-none bg-white w-full border-2 border-gray-300"
          onChange={handleInputChange}
          value={message}
          maxLength={maxChars}>
        </textarea>
        <div className="flex justify-between items-center w-full">
          <p className={`text-red-500 text-sm ${error ? '' : 'invisible'}`}>
            {error || 'placeholder'}
          </p>
          <p className="text-xs">{count}/{maxChars}</p>
        </div>
        <SubmitButton />
      </form>

    </>
  )
}