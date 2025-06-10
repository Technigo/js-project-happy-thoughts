import { IoTrashOutline } from "react-icons/io5"
import { API_URL } from "../utils/constants"

const DeleteButton = ({ id, onDelete }) => {
  
  const handleDelete = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "delete"
      })
      if (!response.ok){
        throw new Error("Failed to delete thought")
      }

      onDelete(id)

    } catch (error) {
      console.log("Error deleting message", error)
    }
  }
  return (
    <button onClick={handleDelete}>
      <IoTrashOutline />
    </button>
  )
}

export default DeleteButton