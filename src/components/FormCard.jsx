import { useState } from "react"
import { SubmitButton } from "./SubmitButton"
import { MessageCard } from "./MessageCard";

export const FormCard = () => {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])



  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim() === '') return
    setMessages((prevMessages) => [...prevMessages, message]); 
    setMessage(''); 
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
        <p className="text-xs">Characters aligned left</p>
        <SubmitButton />

      </form>
      <div className="flex flex-col gap-4 mt-4">
        {messages.map((msg, index) => (
          <MessageCard key={index} message={msg} />
        ))}
      </div>


    </>
  )
}