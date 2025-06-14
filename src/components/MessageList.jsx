import MessageItem from "./MessageItem";

const MessageList = ({
  thoughts,
  onLike,
  onDelete,
  onEdit,
  isLoggedIn,
  currentUser,
}) => {
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
          currentUser={currentUser}
          onDelete={onDelete}
          onEdit={onEdit}
          isLoggedIn={isLoggedIn}
          aria-label={`Message from ${thought.username} on ${new Date(
            thought.createdAt
          ).toLocaleDateString()}: ${thought.message}`}
        />
      ))}
    </>
  );
};

export default MessageList;
