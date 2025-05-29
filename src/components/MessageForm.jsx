import { useState } from 'react';

const MessageForm = ({ onAddMessage }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim().length < 5 || message.trim().length > 140) {
      setError('Message must be between 5 and 140 characters');
      return;
    }

    fetch('https://happy-thoughts-api-4ful.onrender.com/thoughts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message.trim() })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          onAddMessage(data);
          setMessage('');
          setError('');
        } else {
          setError('Something went wrong.');
        }
      })
      .catch(() => setError('Network error'));
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <textarea
        value={message}
        onChange={(e) => { 
          if (e.target.value.length <= 140) {
            setMessage(e.target.value);
          }
        }}
        placeholder="Write a happy thought..."
        rows="3"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Send Message ❤️</button>
    </form>
  );
};

export default MessageForm;