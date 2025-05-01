import React from 'react';

const MessageCard = ({ message }) => {
  return (
    <div className="message-card">
      <p>{message.text}</p>
      <small>{message.time}</small>
    </div>
  );
};

export default MessageCard;