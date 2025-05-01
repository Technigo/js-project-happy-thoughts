import { useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages([newMessage, ...messages]);
  };

  return (
    <>
      <h1>Happy Thoughts</h1>
      <div className="">
        <p>Is there anything that makes you happy right now?</p>
      </div>
    </>
  );
};

export default App;
