import MessageCard from "./MessageCard"

const MessagesContainer = ({ messages, onLike }) => {
  return (
    <div
      className="flex flex-col gap-10"
    >
      {messages.map((message) => {
        return (
          <MessageCard
            key={message._id}
            message={message}
            onLike={() => onLike(message._id)} />
        )
      })}
    </div>
  )
}

export default MessagesContainer