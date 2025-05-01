import { useState } from 'react';

const MessageForm = ({ onAddMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onAddMessage({
        id: Date.now(),
        text: message.trim(),
        time: new Date().toLocaleTimeString(),
      });
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a happy thought..."
        rows="3"
      />
      <button type="submit">Send Message ❤️</button>
    </form>
  );
};

export default MessageForm;