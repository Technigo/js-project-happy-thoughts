import { IoPencil } from "react-icons/io5"
import { useThoughtStore } from "../store/useThoughtStore"
import { useState } from "react"

const EditButton = ({ id, currentMessage }) => {
  const editThought = useThoughtStore(state => state.editThought)
  // const [newMessage, setNewMessage] = useState(currentMessage)
  
  const handleEdit = async (event) => {
    event.preventDefault() 
    const newMessage = prompt("Edit your message:", currentMessage)
    if (newMessage !== null && newMessage.trim().length > 0) {
      // setNewMessage(userInput)
      await editThought(id, newMessage)
    }
  }

  return (
    <button onClick={handleEdit}>
      <IoPencil />
    </button>
  )
}

export default EditButton