import React from "react";
import styled from "styled-components";

const Text = styled.span`
  color: #7a7b7b;
    font-size: 15px;
`

export const TimeAgo = ({ timestamp }) => {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  if (isNaN(date)) return <Text>Invalid date</Text>;

  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 5) return <Text>just now</Text>;

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      return <Text>{rtf.format(-count, unit)}</Text>;
    }
  }

  return <Text>just now</Text>;
};

