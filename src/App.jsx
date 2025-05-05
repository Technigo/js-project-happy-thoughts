import { useState } from "react";
import MessageList from "./Components/MessageList";
import MessageForm from "./Components/MessageForm";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  const addThought = (newThought) => {
    setThoughts([newThought, ...thoughts]);
  };
  return (
    <main>
      <MessageForm onSubmit={addThought} />
      <MessageList thoughts={thoughts} />
    </main>
  );
};
