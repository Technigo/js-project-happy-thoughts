import React, { useEffect, useState } from "react";

const Timer = ({ callQueuedTime }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const queuedTime = new Date(callQueuedTime).getTime();

    const calculateTimeAgo = () => {
      const now = new Date().getTime();
      const timeDifference = Math.floor((now - queuedTime) / 1000);

      if (timeDifference < 60) return `${timeDifference} seconds ago`;
      const minutes = Math.floor(timeDifference / 60);
      if (minutes < 60) return `${minutes} minutes ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours} hours ago`;
      const days = Math.floor(hours / 24);
      return `${days} days ago`;
    };

    const intervalId = setInterval(() => {
      setTimeAgo(calculateTimeAgo());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [callQueuedTime]);

  return <p>{timeAgo}</p>;
};

export default Timer;
