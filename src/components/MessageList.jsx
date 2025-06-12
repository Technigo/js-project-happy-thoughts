import { MessageCard } from "./MessageCard";
import { Loader } from "./Loader";

export const MessageList = ({ messages = [], loading, onLike }) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {messages.map((msg) => (
        <MessageCard key={msg._id} message={msg} onLike={onLike} />
      ))}
    </>
  );
};
