import moment from 'moment';
import { useEffect, useState } from "react";

import { Loader } from "../../components/Loader";
import { CommentCard } from "../comment-card/CommentCard";
import { MessageCard } from "../message-card/MessageCard"

//#region --- FUNCTIONS ---
export const Cards = () => {

  const [userInput, setUserInput] = useState("")
  const [messages, setMessages] = useState([])
  const [recentComments, setRecentComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiNewId, setApiNewId] = useState()

  //https://happy-thoughts-api-4ful.onrender.com/thoughts
  //const apiUrl = "http://localhost:8080/thoughts"
  const apiUrl = "https://js-project-api-afon.onrender.com/thoughts"
  

  useEffect(() => {
    setLoading(true);

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json()
      })
      .then(json => {
        const normalized = json.map((item) => ({
          id: item._id,
          text: item.message.trim(),
          timestamp: moment(item.createdAt).fromNow(),
          likes: item.hearts,
          liked: false
        }))
        setRecentComments(normalized)
      })
      .catch(error => {
        console.error('Fetch error:', error.message);
      })
      .finally(() => {
        setLoading(false);

      });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    if (userInput.trim() === "")
      return

    const newMessage = {
      id: Date.now(), // This will be a uniqe ID
      text: userInput.trim(),
      timestamp: moment().fromNow(),
      likes: 0,
      liked: false,
    }

    setMessages((prev) => [newMessage, ...prev])
    setUserInput("")

  }

  //#endregion

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section>
        < MessageCard
          userInput={userInput}
          setUserInput={setUserInput}
          comment={submitHandler}
          setApiNewId={setApiNewId}
        />
      </section>

      <section>
        {[...messages, ...recentComments].map((item, index) => (
          <CommentCard
            key={item.id}
            id={item.id}
            apiNewId={apiNewId}
            text={item.text}
            timestamp={item.timestamp}
            likes={item.likes}
            liked={item.liked}
            setMessages={setMessages}
            setRecentComments={setRecentComments}
            isNewComment={index === 0} // Optional: Only mark the very first item as new

          />
        ))}

      </section>
    </>
  )
}