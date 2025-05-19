import React, { useState } from "react";
import { PinkButton, BoxStyle, TextAreaStyle } from "./Boxstyles";

const MessageForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const maxLength = 140;
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((newThought) => {
        onSubmit(newThought); // Add the new thought to the list in App.jsx
        setMessage(""); // Clear the input field
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error posting thought:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  };

  return (
    <BoxStyle
      style={{ backgroundColor: "#efeeee" }}
      onSubmit={handleSubmit}
      role="form"
      aria-label="Form to submit a happy thought"
    >
      <p>What's making you happy right now?</p>
      <TextAreaStyle
        value={message}
        onChange={handleChange}
        rows="3"
        aria-label="Write your happy thought here"
      />
      <p style={{ color: message.length > maxLength ? "red" : "black" }}>
        {maxLength - message.length > 0
          ? `You have ${maxLength - message.length} characters left`
          : `decrease characters by ${maxLength - message.length}`}
      </p>
      <PinkButton
        type="submit"
        disabled={message.length < 5 || message.length > 140}
      >
        {loading ? "Sharing The Love..." : "❤️ Send Happy Thought ❤️"}
      </PinkButton>
    </BoxStyle>
  );
};

export default MessageForm;
