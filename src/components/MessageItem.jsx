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
  onDelete,
  onEdit,
}) => {
  const handleLikes = () => {
    onLike(thought._id);
  };

  const handleEdit = (thoughtId, newMessage) => {
    const accessToken = localStorage.getItem("userToken");
    fetch(`${API_URL}/thoughts/${thoughtId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ message: newMessage }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          onEdit(data.thought); // Update state in App.jsx

          // Optionally update UI here
        } else {
          console.error("Failed to update thought:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating thought:", error);
      });
  };

  const handleDelete = (thoughtId) => {
    const accessToken = localStorage.getItem("userToken");
    fetch(`${API_URL}/thoughts/${thoughtId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          onDelete(thoughtId);
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

  const isOwner = currentUser && thought.username === currentUser.username;

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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <PinkButton
                type="button"
                style={{ marginLeft: "1rem", float: "right" }}
                aria-label="Delete this message"
                onClick={() => handleDelete(thought._id)}
              >
                Delete
              </PinkButton>
              <PinkButton
                type="button"
                style={{ marginLeft: "0.5rem", float: "right" }}
                aria-label="Edit this message"
                onClick={() => {
                  const newMessage = prompt(
                    "Edit your message:",
                    thought.message
                  );
                  if (newMessage) {
                    handleEdit(thought._id, newMessage);
                  }
                }}
              >
                Edit
              </PinkButton>
            </div>
          )}
        </div>
      </BoxFooterStyle>
    </BoxStyle>
  );
};

export default MessageItem;
