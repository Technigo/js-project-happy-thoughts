import { useState } from "react";
import { PinkButton, BoxStyle, BoxFooterStyle } from "./Boxstyles";
import styled from "styled-components";
import Timer from "./TimePast";

const HeartButton = styled(PinkButton)`
  background-color: ${(props) =>
    props.heartButtonColor <= 0 ? "lightgrey" : "pink"};
  padding: 0.88rem 1rem;
`;
const HeartContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const MessageItem = ({ message, hearts, createdAt }) => {
  const [heartCount, setHeartCount] = useState(hearts);

  const handleLikes = () => {
    setHeartCount(heartCount + 1); // Increment the heart count
  };
  return (
    <BoxStyle>
      <p style={{ fontSize: "1.25rem" }}>{message}</p>
      <BoxFooterStyle>
        <HeartContainer>
          <HeartButton
            type="button"
            heartButtonColor={heartCount}
            onClick={handleLikes}
          >
            ❤️
          </HeartButton>
          <p> x {heartCount}</p>
        </HeartContainer>

        <Timer callQueuedTime={createdAt} />
      </BoxFooterStyle>
    </BoxStyle>
  );
};

export default MessageItem;
