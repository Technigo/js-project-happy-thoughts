import { useState } from "react"
import SubmitButton from "./SubmitButton"
import Tag from "./Tag"

const MessageForm = ({ onError, update }) => {
  const [message, setMessage] = useState("")
  const [characters, setCharacters] = useState(0)
  const [tags, setTags] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const maxCharacters = 140
  const minCharacters = 5
  const tagsOptions = ["travel", "food", "family", "friends", "humor", "nature", "wellness", "home", "entertainment", "work", "other"]
  const url = "https://think-happy-api.onrender.com/thoughts"

  const postMessage = async (message, tags) => {
    let tagsArray = tags
    if (tags.length === 0) {
      tagsArray = ["other"]
    }
    try {
      setErrorMessage("")
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          message: message,
          tags: tagsArray
        }),
        headers: { "Content-Type": "application/json" }
      })
      if (response.ok) {
        const newMessage = await response.json()
        update((messages) => [newMessage.response, ...messages])
      }
    } catch (error) {
      setErrorMessage(`An error occured when posting thought: ${error.message}`)
      onError(errorMessage)
    } finally {
      //
    }
  }

  const handleTyping = (event) => {
    setMessage(event.target.value)
    setCharacters(event.target.value.length)
  }

  const handleSelectTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag))
    } else {
      setTags((tags) => [...tags, tag])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postMessage(message, tags)
    setMessage("")
    setTags([])
    setCharacters(0)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event)
    }
  }

  return (
    <article
      className="bg-(--color-secondary) border border-black border-solid shadow-[10px_10px] shadow-black p-5"
    >
      <form
        className="flex flex-col items-start gap-3"
        onSubmit={handleSubmit}
      >
        <label htmlFor="thoughtInput">What's making you happy right now?</label>
        <textarea
          id="thoughtInput"
          className="bg-white border border-gray-400 w-full p-2 font-mono resize-none focus:outline-(--color-accent)"
          placeholder="Share your happy thought!"
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
          value={message}
          maxLength={maxCharacters}
        />
        <p
          className={`font-mono text-xs ${characters < maxCharacters ? 'text-[#464646]' : 'text-[#ff0000]'} self-end -mt-2 mb-1`}
        >
          {characters}/{maxCharacters} characters
        </p>
        {characters > minCharacters && (
          <div className="flex flex-col gap-1">
            <p className="text-sm">Select categories:</p>
            <ul className="flex flex-wrap gap-1 cursor-pointer">
              {tagsOptions.map(tag => {
                return (
                  <Tag key={tag} tag={tag} onSelect={handleSelectTag} />
                )
              })}
            </ul>
          </div>
        )}
        <SubmitButton text="❤️ Send Happy Thought ❤️" isActive={message.length >= minCharacters ? true : false} />
      </form>
    </article>
  )
}

export default MessageForm