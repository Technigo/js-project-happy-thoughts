import { useState } from "react";
import styled from "styled-components";

import { DeleteIcon } from "../../components/icons/DeleteIcon";
import { EditIcon } from "../../components/icons/EditIcon";
import { SaveIcon } from "../../components/icons/SaveIcon";

//#region ---- STYLING ----

const CommentCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  border: 1px solid #000;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 1);
  width: 280px;
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
      background-color: #eeeeee;}
    }
  `

const CommentCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

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

  const apiUrl = "https://js-project-api-afon.onrender.com/thoughts"
  //const apiUrl = "http://localhost:8080/thoughts"

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  //#region ---- likeHandeler ----
  const likeHandeler = (id,
    setMessages,
    setRecentComments,
    apiNewId) => {

    setIsButtonDisabled(true)

    if (setMessages) {
      console.log("setmessage")
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
      console.log("setRecentComments")
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
      //https://happy-thoughts-api-4ful.onrender.com/thoughts/${apiNewId}/like
      fetch(`${apiUrl}/${apiNewId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    fetch(`${apiUrl}/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //#endregion ---- likeHandeler ----
  //#region ---- deleteHandeler ----
  const deleteHandeler = (id) => {
    if (setMessages) {      
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)            
      )      
    }
    if (setRecentComments) {
      setRecentComments((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
        )     
    }
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  //#endregion ---- deleteHandeler ----
  //#region ---- editHandeler ---- 
  const [userEditInput, setUserEditInput] = useState("")
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setUserEditInput(text)
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);

    if (setMessages) {
      setMessages((prevMessages) => 
      prevMessages.map(
        (message) => message.id === id ? 
      { ...message, text: userEditInput } : message
      ))
    }

    if (setRecentComments) {
      setRecentComments((prevMessages) => 
      prevMessages.map((message) => message.id === id ? 
      { ...message, text: userEditInput } : message
      ))
    }

    fetch(`${apiUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ newThoughtMessage: userEditInput }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((data) => console.log("API response:", data))
    .catch((err) => console.error("API error:", err));   

  };  
  //#endregion ---- editHandeler ----

  //#endregion

  return (
    <CommentCardWrapper isNewComment={isNewComment}>
      
      <CommentCardHeader>
        <label>
          {isEditing ? 
             <textarea
              value={userEditInput}
              onChange={(event) => setUserEditInput(event.target.value)}
              maxLength={140}              
            ></textarea>
            :  <p>{text}</p>
          }
        </label>
        <div>
          <button
            onClick={isEditing ? handleSave : handleEdit}
          > 
            {isEditing ? 
              <SaveIcon/>              
              : 
              <EditIcon/> 
            }            
          </button>
          <button
            onClick={() => deleteHandeler(id, apiNewId)}
          >
            <DeleteIcon/>
          </button>          
        </div>       
      </CommentCardHeader> 
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