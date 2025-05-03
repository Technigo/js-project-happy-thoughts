import MessageCard from "./MessageCard.jsx"

//renders the messages, no styling only data
const MessageList = ({ messages }) => {
  const limitedMessages = messages.slice(0, 3)

  return (
    <>
      {limitedMessages.map((msg) => (
        <MessageCard key={msg.id} message={msg} /> 
      ))}
    </>
  )
}

export default MessageList



