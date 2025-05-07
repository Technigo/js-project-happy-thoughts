import MessageCard from "./MessageCard.jsx"

//renders a list of MessageCards using the thoughts fetched from the API

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



