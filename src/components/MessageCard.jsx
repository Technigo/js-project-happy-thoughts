import { useState } from "react"
import { formatDistance } from "date-fns"
import MessageCardButton from "./MessageCardButton"
import LikeButton from "./LikeButton"
import Tag from "./Tag"
import SubmitButton from "./SubmitButton"
import CancelButton from "./CancelButton"

const MessageCard = ({ message, onError, onFilter, update }) => {
  const [errorMessage, setErrorMessage] = useState("")
  const [editedMessage, setEditedMessage] = useState("")
  const [showInput, setShowInput] = useState(false)
  const maxCharacters = 140
  const minCharacters = 5
  const url = "https://think-happy-api.onrender.com/thoughts"

  const likeMessage = async () => {
    try {
      setErrorMessage("")
      const response = await fetch(`${url}/${message._id}/like`, { method: "PATCH" })
      if (response.ok) {
        const likedMessage = await response.json()
        update((messages) => messages.map(m =>
          m._id === message._id ? { ...m, hearts: likedMessage.response.hearts } : m
        ))
      }
    } catch (error) {
      setErrorMessage(`An error occured when liking thought: ${error.message}`)
      onError(errorMessage)
    } finally {
      //
    }
  }

  const deleteMessage = async () => {
    try {
      setErrorMessage("")
      const response = await fetch(`${url}/${message._id}`, { method: "DELETE" })
      if (response.ok) {
        const deletedMessage = await response.json()
        update((messages) => messages.filter(m =>
          m._id !== deletedMessage.response._id
        ))
      }
    } catch (error) {
      setErrorMessage(`An error occured when deleting thought: ${error.message}`)
      onError(errorMessage)
    } finally {
      //
    }
  }

  const editMessage = async (newMessage) => {
    try {
      setErrorMessage("")
      const response = await fetch(`${url}/${message._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          message: newMessage,
        }),
        headers: { "Content-Type": "application/json" }
      })
      if (response.ok) {
        const editedMessage = await response.json()
        update((messages) => messages.map(m =>
          m._id === message._id ? { ...m, message: editedMessage.response.message } : m
        ))
      }
    } catch (error) {
      setErrorMessage(`An error occured when editing thought: ${error.message}`)
      onError(errorMessage)
    } finally {
      //
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
              className="flex flex-wrap gap-2"
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
                <SubmitButton text="Save" isActive={editedMessage.length >= minCharacters ? true : false} />
                <CancelButton onClick={onCancel} />
              </div>
            </form>
          }
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