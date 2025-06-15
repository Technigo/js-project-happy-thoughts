import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import SubmitButton from "./SubmitButton"
import Tag from "./Tag"

const MessageForm = ({ update }) => {
  const { currentUser, token } = useAuth()
  const [message, setMessage] = useState("")
  const [characters, setCharacters] = useState(0)
  const [tags, setTags] = useState([])
  const [error, setError] = useState("")
  const maxCharacters = 140
  const minCharacters = 5
  const tagsOptions = ["travel", "food", "family", "friends", "humor", "nature", "wellness", "home", "entertainment", "work", "other"]
  // const url = "https://think-happy-api.onrender.com/thoughts"
  const url = "http://localhost:8080/thoughts" // local api

  const postMessage = async (message, tags) => {
    let tagsArray = tags
    if (tags.length === 0) {
      tagsArray = ["other"]
    }
    try {
      setError("")
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          user: currentUser.id,
          message: message,
          tags: tagsArray
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
      const data = await response.json()
      if (!response.ok) {
        if (response.status === 401) {
          setError("You need to be logged in to post a thought.")
          return
        }
        setError("Posting thought failed." + data.message)
        return
      }
      const newMessage = data.response
      update((messages) => [newMessage, ...messages])
    } catch (error) {
      setError(`An error occured when posting thought: ${error.message}`)
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
        {error && <p className="font-mono text-red-500">{error}</p>}
        <SubmitButton text="❤️ Send Happy Thought ❤️" isActive={message.length >= minCharacters ? true : false} />
      </form>
    </article>
  )
}

export default MessageForm