import LikeButton from "./LikeButton"

const MessageCard = ({ message, onLike }) => {

  // function to format timestamp
  const toElapsedTime = (timeStamp) => {
    const unixTimeStamp = Date.parse(timeStamp)
    const now = Date.now()
    const timeDiff = now - unixTimeStamp

    const seconds = Math.floor(timeDiff / 1000)
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`

    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`

    const days = Math.floor(hours / 24)
    if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`

    const months = Math.floor(days / 30)
    if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`

    const years = Math.floor(days / 365)
    return `${years} year${years !== 1 ? 's' : ''} ago`
  }

  return (
    <article
      className="bg-white border border-black border-solid shadow-[10px_10px] shadow-black p-5 animate-fadeIn"
    >
      <div
        className="flex flex-col justify-between gap-3"
      >
        <p
          className="font-mono text-lg wrap-break-word"
        >
          {message.message}
        </p>
        <div
          className="flex justify-between items-center"
        >
          <div
            className="flex items-center gap-2"
          >
            <LikeButton likes={message.hearts} onLike={onLike} />
            <p
              className="text-[#707070] text-sm"
            >
              x {message.hearts}
            </p>
          </div>
          <p
            className="text-[#707070] text-sm"
          >
            {toElapsedTime(message.createdAt)}
          </p>
        </div>
      </div>
    </article>
  )
}

export default MessageCard