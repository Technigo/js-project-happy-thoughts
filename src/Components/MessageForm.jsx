import React, { useState } from "react";
import { PinkButton, BoxStyle, TextAreaStyle } from "./Boxstyles";

const MessageForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const maxLength = 70;

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.length > 0 && message.length <= maxLength) {
      const newThought = {
        id: Date.now(),
        message,
        hearts: 0,
        createdAt: new Date(),
      };
      onSubmit(newThought);
      setMessage("");
    }
  };

  return (
    <BoxStyle style={{ backgroundColor: "#efeeee" }} onSubmit={handleSubmit}>
      <p>What's making you happy right now?</p>
      <TextAreaStyle value={message} onChange={handleChange} />
      <p style={{ color: message.length > maxLength ? "red" : "black" }}>
        {maxLength - message.length > 0
          ? `You have ${maxLength - message.length} characters left`
          : "You have reached the maximum number of characters"}
      </p>
      <PinkButton
        type="submit"
        disabled={message.length > maxLength || message.length === 0}
      >
        ❤️ Send Happy Thought ❤️
      </PinkButton>
    </BoxStyle>
  );
};

export default MessageForm;
