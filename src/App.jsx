import { useEffect, useState } from "react";
import { fetchThoughts, postThought, likeThought, deleteThought } from "./api/thoughts";
import { Form } from "./components/Form";
import { MessageList } from "./components/MessageList";
import { GlobalStyles } from "./GlobalStyles";
import { Loader } from "./components/Loader";
import { Logo } from "./components/Logo";
import { Footer } from "./components/Footer";
import {
  getLikedThoughts,
  saveLikedThought,
  getLikeCount,
} from "./utils/localLikes";

export const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [likeCount, setLikeCount] = useState(getLikeCount());

  // Get all messages
  const getMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchThoughts();
      setMessages(data.results);
    } catch (error) {
      console.error("Fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Post new message
  const handleNewMessage = async (message) => {
    const optimisticThought = {
      _id: Date.now().toString(),
      message,
      hearts: 0,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [optimisticThought, ...prev]);
    setPosting(true);

    try {
      await postThought(message);
      await getMessages();
    } catch (error) {
      console.error("Post failed", error);
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === id ? { ...msg, hearts: msg.hearts + 1 } : msg
      )
    );
  
    if (!getLikedThoughts()[id]) {
      saveLikedThought(id);
      setLikeCount(getLikeCount()); 
    }
  
    try {
      await likeThought(id);
    } catch (error) {
      console.error("Like failed", error);
    }
  };

  const handleDeleteThought = async (id) => {
    try {
      await deleteThought(id);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };
  

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <GlobalStyles />
      <Logo />
      <h1>Happy Thoughts</h1>
      <Form onSubmitMessage={handleNewMessage} posting={posting} />
      {!loading && posting && <Loader />}
      <MessageList messages={messages} loading={loading} onLike={handleLike} onDelete={handleDeleteThought} />
      <Footer likeCount={likeCount} />
    </>
  );
};
