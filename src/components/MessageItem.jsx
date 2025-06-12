import { PinkButton, BoxStyle, BoxFooterStyle } from "../styles/Messagestyles";
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

const API_URL =
  import.meta.env.VITE_API_URL || "https://js-project-api-k17p.onrender.com";

const MessageItem = ({
  thought,
  message,
  hearts,
  onLike,
  createdAt,
  className,
  currentUser,
}) => {
  const handleLikes = () => {
    onLike(thought._id);
  };
  const handleDelete = (thoughtId) => {
    const accessToken = localStorage.getItem("userToken");
    fetch(`${API_URL}${thoughtId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Thought deleted successfully");
        } else {
          console.error("Failed to delete thought:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting thought:", error);
      });
  };
  const isValidDate = createdAt && !isNaN(new Date(createdAt).getTime());
  const createdAtISO = isValidDate
    ? DateTime.fromISO(new Date(createdAt).toISOString())
    : null;

  const formattedTime =
    createdAtISO && createdAtISO.isValid
      ? createdAtISO.toRelative()
      : "Date not available";

  const isOwner = currentUser && thought.username === currentUser;

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
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <p>{formattedTime}</p>
          {isOwner && (
            <PinkButton
              type="button"
              style={{ marginLeft: "1rem", float: "right" }}
              aria-label="Delete this message"
              onClick={() => handleDelete(thought._id)}
            >
              Delete
            </PinkButton>
          )}
        </div>
      </BoxFooterStyle>
    </BoxStyle>
  );
};

export default MessageItem;
