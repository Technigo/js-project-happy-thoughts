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
      <div className="header">
        <h1>Happy Thoughts</h1>
        <img src="./src/assets/images/Sharing_thoughts.png" alt="Sharing thoughts" />
        </div>
        <div className="outer-wrapper"></div>
          <div className="app-container">
            <p>What makes you happy right now?</p>
            <MessageForm onAddMessage={addMessage} />
          </div>
          <div className="message-container">
            <MessageList messages={messages} />
          </div>
    </>
  );
};

export default App;
