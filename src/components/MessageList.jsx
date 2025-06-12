import MessageItem from "./MessageItem";

const MessageList = ({ thoughts, onLike }) => {
  return (
    <>
      {thoughts.map((thought) => (
        <MessageItem
          key={thought._id}
          thought={thought}
          message={thought.message}
          className="message-item"
          hearts={thought.hearts}
          createdAt={thought.createdAt}
          onLike={onLike}
        />
      ))}
    </>
  );
};

export default MessageList;
