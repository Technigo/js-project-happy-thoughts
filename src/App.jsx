import { useState } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages([newMessage, ...messages]);
  };

  return (
    <>
      <h1>Happy Thoughts</h1>
      <div className="app-container">
        <p>Is there anything that makes you happy right now?</p>
        <MessageForm onAddMessage={addMessage} />
        {messages.length >= 10 && <p className="hit-10">You hit 10! 🎉</p>}
      </div>
      <div className="message-container">
        <MessageList messages={messages} />
      </div>
    </>
  );
};

export default App;
