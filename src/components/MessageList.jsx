import MessageItem from "./MessageItem";

const MessageList = ({ thoughts, onLike, onDelete, onEdit }) => {
  // Get current user from localStorage
  const username = localStorage.getItem("username");
  const currentUser = username ? { username } : null;

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
          currentUser={currentUser} // Pass the correct user object
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default MessageList;
