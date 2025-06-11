import { MessageCard } from "./MessageCard"

export const MessageList = ({ messages, onLike, onDelete, onEdit }) => {

  return (
    <div className="flex flex-col gap-4 mt-4">

      {messages.map(msg => (

        <MessageCard
          key={msg._id}
          message={msg}
          onLike={() => onLike(msg._id)}
          onDelete={() => onDelete(msg._id)}
          onEdit={() => onEdit(msg._id)} />
      ))}
    </div>
  )
}