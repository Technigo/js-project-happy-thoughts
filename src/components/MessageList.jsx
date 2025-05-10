import MessageCard from "./MessageCard.jsx"

//renders the thoughts/messages fetched from the API
const MessageList = ({ thoughts = [] }) => {
  return (
    <>
      {thoughts.map((msg) => (
        <MessageCard key={msg._id} message={msg} />
      ))}
    </>
  )
}

export default MessageList



