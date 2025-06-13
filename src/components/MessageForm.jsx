import { useState } from "react";
import { PinkButton, BoxStyle, TextAreaStyle } from "../styles/Messagestyles";

const MessageForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const maxLength = 140;
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const accessToken = localStorage.getItem("userToken"); // <-- Add this line

    if (!accessToken) {
      alert("You must be logged in to post a thought.");
      setLoading(false);
      return;
    }

    fetch("https://js-project-api-k17p.onrender.com/thoughts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((newThought) => {
        onSubmit(newThought);
        setMessage("");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error posting thought:", error);
        setLoading(false);
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
