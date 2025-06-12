import { IoTrashOutline } from "react-icons/io5"
import { useThoughtStore } from "../store/useThoughtStore"

const DeleteButton = ({ id }) => {
  const deleteThought = useThoughtStore(state => state.deleteThought)
  
  const handleDelete = async (event) => {
    event.preventDefault() 
    const confirm = window.confirm("Are you sure you want to delete this thought?")
    if (confirm) {
      await deleteThought(id)
    }
  }

  return (
    <button onClick={handleDelete}>🗑️
      {/* <IoTrashOutline /> */}
    </button>
  )
}

export default DeleteButton