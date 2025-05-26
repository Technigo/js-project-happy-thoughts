import React, { useEffect, useState } from "react";

const Message = ({ id, message, time, likes }) => {
  const thoughtIdUrl = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  // reads from local storage and loads message with like functionality if it has been liked
  // without this i won't see my likes
  useEffect(() => {
    const likedMessages =
      JSON.parse(localStorage.getItem("likedMessages")) || [];
    if (likedMessages.includes(id)) {
      setLiked(true);
    }
  }, [id]);

  const handleLike = async () => {
    try {
      let response;
      if (liked) {
        response = await fetch(thoughtIdUrl, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to unlike");

        const likedMessages =
          JSON.parse(localStorage.getItem("likedMessages")) || [];
        const updatedLikedMessages = likedMessages.filter(
          (currentId) => currentId !== id
        );
        localStorage.setItem(
          "likedMessages",
          JSON.stringify(updatedLikedMessages)
        );

        setLiked(false);
        setLikeCount((count) => count - 1);
      } else {
        response = await fetch(thoughtIdUrl, { method: "POST" });

        if (!response.ok) throw new Error("Failed to like");

        const likedMessages =
          JSON.parse(localStorage.getItem("likedMessages")) || [];
        likedMessages.push(id);
        localStorage.setItem("likedMessages", JSON.stringify(likedMessages));

        setLiked(true);
        setLikeCount((count) => count + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTime = (time) => {
    let timeDiff = Math.floor((Date.now() - new Date(time)) / 1000);

    if (timeDiff < 60) {
      return `${timeDiff} second${timeDiff === 1 ? "" : "s"} ago`;
    }
    if (timeDiff >= 60 && timeDiff < 3600) {
      timeDiff = Math.floor(timeDiff / 60);
      return `${timeDiff} minute${timeDiff === 1 ? "" : "s"} ago`;
    }
    if (timeDiff >= 3600 && timeDiff < 86400) {
      timeDiff = Math.floor(timeDiff / 3600);
      return `${timeDiff} hour${timeDiff === 1 ? "" : "s"} ago`;
    }
    if (timeDiff >= 86400 && timeDiff < 2592000) {
      timeDiff = Math.floor(timeDiff / 86400);
      return `${timeDiff} day${timeDiff === 1 ? "" : "s"} ago`;
    }
    return "a long time ago";
  };

  return (
    <div className=" flex flex-col justify-between gap-4 border border-black bg-white p-4 shadow-[4px_4px_0px_black]">
      <p className="font-mono text-lg font-normal">{message}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center justify-center rounded-full border-none p-2 text-lg cursor-pointer ${
              liked ? "bg-pink-300" : "bg-gray-300"
            }`}
          >
            <ion-icon name="heart"></ion-icon>
          </button>
          <p className="text-sm text-gray-500 font-sans">x {likeCount}</p>
        </div>
        <p className="text-sm text-gray-500 font-sans">{calculateTime(time)}</p>
      </div>
    </div>
  );
};

export default Message;
