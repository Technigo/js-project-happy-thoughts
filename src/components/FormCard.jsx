import { useState } from "react";
import { SubmitButton } from "./SubmitButton"

export const FormCard = () => {
  const [text, setText] = useState('')

  return (
    <>
      <form className="flex flex-col gap-5 bg-gray-100 p-5 border rounded-xs shadow-[10px_10px] shadow-black">
        <label>What's making you happy right now?</label>
        <textarea className="resize-none bg-white w-full border-2 border-gray-300" 
          onChange={(event) => setText(event.target.value)}
          value={text}>
          
        </textarea>
        <p className="text-xs">Characters aligned left</p>
        <SubmitButton/>
        
        
      </form>
    </>
  )
}