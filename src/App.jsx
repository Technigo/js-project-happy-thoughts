import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Messages from "./components/Messages";
import LikedMessages from "./components/LikedMessages";

export const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        const sortedMessages = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[500px] w-full">
        <h1 className="text-center font-sans mb-10 text-4xl text-pink-500">
          Happy Thoughts!
        </h1>
        <Form setMessages={setMessages} />
        <Messages messages={messages} />
        <LikedMessages messages={messages} />
      </div>
    </div>
  );
};
