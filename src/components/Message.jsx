import { useState } from "react"

const Message = () => {
  const [message, setMessage] = useState([])


  const handleSubmit = (event) => {
    event.preventDefault()


  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        What making you happy right now?
        <textarea
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
    </form>
  )

}

export default Message