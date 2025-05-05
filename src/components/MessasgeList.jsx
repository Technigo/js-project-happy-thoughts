import { MessageCard } from "./MessageCard"

export const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {messages.map((msg, i) => (
        <MessageCard
          key={i}
          message={msg} />
      ))}
    </div>

  )
}