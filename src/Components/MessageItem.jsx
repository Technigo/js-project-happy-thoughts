import { PinkButton, BoxStyle, BoxFooterStyle } from "../styles/Boxstyles";
import styled from "styled-components";
import { DateTime } from "luxon";

const HeartButton = styled(PinkButton)`
  background-color: ${(props) =>
    props.$heartCountColor <= 0 ? "lightgrey" : "pink"};
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

const MessageItem = ({
  thought,
  message,
  hearts,
  onLike,
  createdAt,
  className,
}) => {
  const handleLikes = () => {
    onLike(thought._id);
  };

  const createdAtISO = DateTime.fromISO(new Date(createdAt).toISOString());
  if (!createdAtISO.isValid) {
    console.warn("Invalid date encountered for thought:", thought);
  }

  const formattedTime = createdAtISO.isValid
    ? createdAtISO.toRelative()
    : "Date not available";

  return (
    <BoxStyle className={className}>
      <p style={{ fontSize: "1.25rem" }}>{message}</p>
      <BoxFooterStyle>
        <HeartContainer>
          <HeartButton
            type="button"
            $heartCountColor={hearts}
            onClick={handleLikes}
            aria-label={`Like this message. Current likes: ${hearts}`}
          >
            ❤️
          </HeartButton>
          <p> x {hearts}</p>
        </HeartContainer>
        <p>{formattedTime}</p>
      </BoxFooterStyle>
    </BoxStyle>
  );
};

export default MessageItem;
