import { useState } from "react"
import { formatDistance } from "date-fns"
import { useAuth } from "../context/AuthContext"
import MessageCardButton from "./MessageCardButton"
import LikeButton from "./LikeButton"
import Tag from "./Tag"
import SubmitButton from "./SubmitButton"
import CancelButton from "./CancelButton"

const MessageCard = ({ message, onFilter, update }) => {
  const { token } = useAuth()
  const [error, setError] = useState("")
  const [editedMessage, setEditedMessage] = useState("")
  const [showInput, setShowInput] = useState(false)
  const maxCharacters = 140
  const minCharacters = 5
  // const url = "https://think-happy-api.onrender.com/thoughts"
  const url = "http://localhost:8080/thoughts" // local api

  const likeMessage = async () => {
    try {
      setError("")
      const response = await fetch(`${url}/${message._id}/like`, { method: "PATCH" })
      if (response.ok) {
        const likedMessage = await response.json()
        update((messages) => messages.map(m =>
          m._id === message._id ? { ...m, hearts: likedMessage.response.hearts } : m
        ))
      }
    } catch (error) {
      setError(`An error occured when liking thought: ${error.message}`)
    } finally {
      //
    }
  }

  const deleteMessage = async () => {
    try {
      setError("")
      const response = await fetch(`${url}/${message._id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
      })
      const data = await response.json()
      if (!response.ok) {
        if (response.status === 401) {
          setError("You need to be logged in to delete a thought.")
          return
        }
        if (response.status === 404) {
          setError("You are only allowed to delete your own thoughts.")
          return
        }
        if (response.status === 500) {
          setError("Server error. Please try again later.")
          return
        }
        setError("Deleting thought failed." + data.message)
      }
      const deletedMessage = data.response
      update((messages) => messages.filter(m =>
        m._id !== deletedMessage._id
      ))

    } catch (error) {
      setError(`An error occured when deleting thought: ${error.message}`)
    }
  }

  const editMessage = async (newMessage) => {
    try {
      setError("")
      const response = await fetch(`${url}/${message._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          message: newMessage,
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
      const data = await response.json()
      if (!response.ok) {
        if (response.status === 401) {
          setError("You need to be logged in to edit a thought.")
          return
        }
        if (response.status === 404) {
          setError("You are only allowed to edit your own thoughts.")
          return
        }
        if (response.status === 500) {
          setError("Server error. Please try again later.")
          return
        }
        setError("Editing thought failed." + data.message)
      }
      const editedMessage = data.response
      update((messages) => messages.map(m =>
        m._id === message._id ? { ...m, message: editedMessage.message } : m
      ))
    } catch (error) {
      setError(`An error occured when editing thought: ${error.message}`)
    }
  }

  const onEdit = () => {
    setShowInput(current => !current)
  }

  const onCancel = () => {
    setEditedMessage("")
    setShowInput(false)
  }

  const handleTyping = (event) => {
    setEditedMessage(event.target.value)
  }

  const onSubmitEditedMessage = (event) => {
    event.preventDefault()
    editMessage(editedMessage)
    setEditedMessage("")
    setShowInput(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      onSubmitEditedMessage(event)
    }
  }

  return (
    <article
      className="bg-white border border-black border-solid shadow-[10px_10px] shadow-black p-5 animate-fadeIn"
    >
      <div
        className="flex flex-col justify-between gap-6"
      >
        <div
          className="flex flex-col gap-5"
        >
          <div className="flex justify-between items-center gap-3">
            <ul
              className="flex flex-wrap gap-1"
            >
              {message.tags.map(tag => {
                return <Tag key={tag} tag={tag} onFilter={onFilter} />
              })}
            </ul>
            <div className="flex gap-2 self-start">
              <MessageCardButton icon={"🖋️"} onClick={onEdit} ariaLabel="Edit thought" />
              <MessageCardButton icon={"🗑️"} onClick={deleteMessage} ariaLabel="Delete thought" />
            </div>
          </div>
          <p
            className="font-mono text-lg wrap-break-word"
          >
            {message.message}
          </p>
          {showInput &&
            <form onSubmit={onSubmitEditedMessage}>
              <textarea
                id="thoughtInput"
                className="bg-white border border-gray-400 w-full p-2 font-mono resize-none focus:outline-(--color-accent)"
                placeholder={message.message}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                value={editedMessage}
                maxLength={maxCharacters}
                autoFocus
              />
              <div className="flex justify-between">
                <SubmitButton text="Edit thought" isActive={editedMessage.length >= minCharacters ? true : false} />
                <CancelButton onClick={onCancel} />
              </div>
            </form>
          }
          {error && <p className="font-mono text-red-500">{error}</p>}
        </div>
        <div
          className="flex justify-between items-center"
        >
          <div
            className="flex items-center gap-2"
          >
            <LikeButton likes={message.hearts} onLike={likeMessage} />
            <p
              className="text-[#707070] text-sm"
            >
              x {message.hearts}
            </p>
          </div>
          <p
            className="text-[#707070] text-sm"
          >
            {formatDistance(message.createdAt, new Date(), { addSuffix: true })}
          </p>
        </div>
      </div>
    </article>
  )
}

export default MessageCard