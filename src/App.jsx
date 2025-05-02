import { useState } from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components//MessageList';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages([newMessage, ...messages]);
  };

  return (
    <>
      <h1>Happy Thoughts</h1>
      <div className="app-container container-width">
        <p>What makes you happy right now?</p>
        <MessageForm onAddMessage={addMessage} />
        {messages.length >= 3 && <p className="hit-3">You hit 3! 🎉</p>}
      </div>
      <div className="message-container message-section">
        <MessageList messages={messages} />
      </div>
    </>
  );
};

export default App;
