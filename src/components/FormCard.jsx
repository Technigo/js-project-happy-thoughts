import { useState } from "react"
import { SubmitButton } from "./SubmitButton"


export const FormCard = ({ onSubmit }) => {

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [count, setCount] = useState(0)
  const maxChars = 10

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
      setError(`Only ${maxChars} letters is aloud`)
    }
  }



  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-gray-100 p-4 border rounded-xs shadow-[10px_10px] shadow-black">
        <div className="flex items-end gap-5">
          <label 
            id="happy">What's making you happy right now?
          </label>
          <p className={`text-xs ${count >= maxChars ? 'text-red-500' : 'text-gray-500'
            }`}>{count}/{maxChars}</p>
        </div>

        <textarea
          id="happy"
          className="resize-none bg-white w-full border-2 border-gray-300 focus:outline-red-200"
          onChange={handleInputChange}
          value={message}
          maxLength={maxChars}>
        </textarea>

        <div className="flex flex-col w-full">
          {error && (<p className="text-red-500 text-xs" >
            {error}
          </p>)}
          <SubmitButton className={error ? 'mt-3' : ''} />
        </div>
      </form>

    </>
  )
}