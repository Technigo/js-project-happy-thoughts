import MessageItem from "./MessageItem";

const MessageList = ({ thoughts }) => {
  return (
    <div>
      {thoughts.map((thought) => (
        <MessageItem
          key={thought.id}
          message={thought.message}
          hearts={thought.hearts}
          createdAt={thought.createdAt}
        />
      ))}
    </div>
  );
};

export default MessageList;
