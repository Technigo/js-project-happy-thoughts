import React, { useState } from "react";

const Form = ({ setMessages }) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { message };

    if (message.length === 0) {
      setErrorMessage("Can't submit an empty message!");
      return;
    }

    if (message.length > 140) {
      setErrorMessage("Message can't be longer than 140 characters!");
      return;
    }

    setErrorMessage("");

    try {
      const token = localStorage.getItem("token"); // or wherever you store the JWT

      const response = await fetch(
        "https://api-project-ns11.onrender.com/thoughts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // include token here
          },
          body: JSON.stringify(newMessage),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post message");
      }

      const data = await response.json();
      console.log("Message posted:", data);

      setMessages((prev) => [data.response, ...prev]);

      setMessage("");
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between gap-4 border border-black bg-[#f5f5f5] p-4 shadow-[4px_4px_0px_#000] mb-12"
    >
      <h1 className="text-base font-medium">
        What is making you happy right now?
      </h1>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="font-mono h-[70px] px-2 text-sm font-normal border border-gray-400 rounded bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
      />
      <p
        className={`text-sm mt-2 ${
          message.length > 140 ? "text-red-500 text-sm mt-2" : "text-[#333]"
        }`}
      >
        Character count: {message.length}
      </p>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="self-start flex items-center justify-center gap-1 px-3 py-2 border-none rounded-[15px] bg-pink-200 font-bold text-sm cursor-pointer  hover:bg-pink-300 transition"
      >
        <ion-icon name="heart"></ion-icon>
        Send Happy Thought
        <ion-icon name="heart"></ion-icon>
      </button>
    </form>
  );
};

export default Form;
