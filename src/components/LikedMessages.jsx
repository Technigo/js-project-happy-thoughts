import { useEffect, useState } from "react";

const LikedMessages = () => {
  const [likedMessages, setLikedMessages] = useState([]);

  useEffect(() => {
    const likedMessageIds =
      JSON.parse(localStorage.getItem("likedMessages")) || [];
    setLikedMessages(likedMessageIds);
  }, []);

  return (
    <div className="mb-4 text-right">
      <h2 className="text-base text-gray-500 font-sans">
        You have liked {likedMessages.length} messages
      </h2>
    </div>
  );
};

export default LikedMessages;
