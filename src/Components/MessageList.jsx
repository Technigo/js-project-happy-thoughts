import MessageItem from "./MessageItem";

const MessageList = ({ thoughts }) => {
  return (
    <div>
      {thoughts.map((thought, onLike) => (
        <MessageItem
          key={thought._id}
          thought={thought}
          message={thought.message}
          hearts={thought.hearts}
          createdAt={thought.createdAt}
          onLike={onLike}
        />
      ))}
    </div>
  );
};

export default MessageList;
