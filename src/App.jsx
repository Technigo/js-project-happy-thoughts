import { useState, useEffect } from "react";
import MessageList from "./Components/MessageList";
import MessageForm from "./Components/MessageForm";
import { FooterStyles } from "./Components/FooterStyles";
import handleLike from "./Components/HandlesLikes";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);

  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((res) => res.json())
      .then((data) => setThoughts(data))
      .catch((error) => console.error("Error fetching thoughts:", error));
  }, []);
  const onLike = (id) => {
    handleLike(id).then(() => {
      setThoughts((prevThoughts) =>
        prevThoughts.map((thought) =>
          thought._id === id
            ? { ...thought, hearts: thought.hearts + 1 }
            : thought
        )
      );
    });
  };

  return (
    <>
      <main>
        <MessageForm
          onSubmit={(newThought) => setThoughts([newThought, ...thoughts])}
        />
        <MessageList thoughts={thoughts} onLike={onLike} />
      </main>
      <FooterStyles>
        <div>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/KidFromCalifornia/js-project-happy-thoughts-JH"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Jonny Hicks </p>
          </a>
        </div>
      </FooterStyles>
    </>
  );
};
