import MessageCard from "./MessageCard.jsx"

const MessageList = ({ messages }) => {
  return (
    <>
      {messages.map((msg) => (
        <MessageCard key={msg.id} message={msg} /> 
      ))}
    </>
  )
}

export default MessageList



