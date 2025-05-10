import styled from "styled-components";
import { useState } from "react";

//#region ---- STYLING ----

const CommentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  border: 1px solid #000;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 1);
  width: 320px;
  margin: 28px auto;
  padding: 12px 18px;
  gap: 12px;
  animation: ${({ isNewComment }) => (isNewComment ? 'popComment 0.6s ease-out forwards' : 'none')};

  @keyframes popComment {
    0% {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    60% {
      opacity: 1;
      transform: translateY(10px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (min-width: 640px) {
    width: 620px;    
  }

  p {
   overflow-wrap: break-word;
  }

  button {
    background-color: #eeeeee;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    transition: ease .3s;

    &:hover {
      background-color: #f0aeae;
      transform: scale(1.03);
    }

    &:active {
     box-shadow: inset 0 6px 12px rgba(0, 0, 0, 0.15),
                inset 0 3px 6px rgba(0, 0, 0, 0.10);
      background-color: #de8080;
}

    &.like-color.on {
      background-color: pink;
      border-radius: 50%;
      animation: pulse .7s;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
         
        }
        30% {
          transform: scale(1.3);
        }
        50% {
          transform: scale(0.9);
        }
        70% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1);
        }

    }

    .like-color.off {
      background-color: #eeeeee;
}
    }
  `

const CommentCardFooter = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p {
      color: grey;      
    }

    div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      gap: 10px;
    }
  `

//#endregion

//#region ---- FUNCTIONS ----

export const CommentCard = ({ text,
  timestamp,
  likes,
  liked,
  isNewComment,
  id,
  apiNewId,
  setMessages,
  setRecentComments
}) => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const likeHandeler = (id,
    setMessages,
    setRecentComments,
    apiNewId) => {

    setIsButtonDisabled(true)

    if (setMessages) {
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id
            ? {
              ...message,
              liked: !message.liked,
              likes: message.likes + 1,
            }
            : message
        )
      );
    }
    if (setRecentComments) {
      setRecentComments((prevMessages) =>
        prevMessages.map((message) =>
          message.id === id
            ? {
              ...message,
              liked: !message.liked,
              likes: message.likes + 1,
            }
            : message
        )
      );
    }


    if (apiNewId && apiNewId !== id) {
      fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${apiNewId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });


  };

  //#endregion

  return (
    <CommentCardWrapper isNewComment={isNewComment}>
      <p>{text}</p>

      <CommentCardFooter>
        <div>
          <button
            disabled={isButtonDisabled}
            className={`like-color ${liked ? "on" : "off"}`}
            onClick={() => likeHandeler(id, setMessages, setRecentComments, apiNewId)}
          >❤️</button>
          <p>x {likes}</p>
        </div>
        <p>{timestamp}</p>
      </CommentCardFooter>
    </CommentCardWrapper>


  )
}