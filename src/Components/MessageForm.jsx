import React, { useState } from "react";
import { PinkButton, BoxStyle, TextAreaStyle } from "./Boxstyles";

const MessageForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const maxLength = 140;

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from reloading

    // Send the new thought to the API
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
      method: "POST",
      body: JSON.stringify({ message }), // Send the message as JSON
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((newThought) => {
        onSubmit(newThought); // Call the onSubmit function passed from App.jsx
        setMessage(""); // Clear the input field
      })
      .catch((error) => console.error("Error posting thought:", error));
  };

  return (
    <BoxStyle style={{ backgroundColor: "#efeeee" }} onSubmit={handleSubmit}>
      <p>What's making you happy right now?</p>
      <TextAreaStyle value={message} onChange={handleChange} rows="3" />
      <p style={{ color: message.length > maxLength ? "red" : "black" }}>
        {maxLength - message.length > 0
          ? `You have ${maxLength - message.length} characters left`
          : `decrease characters by ${maxLength - message.length}`}
      </p>
      <PinkButton
        type="submit"
        disabled={message.length < 5 || message.length > 140}
      >
        ❤️ Send Happy Thought ❤️
      </PinkButton>
    </BoxStyle>
  );
};

export default MessageForm;
