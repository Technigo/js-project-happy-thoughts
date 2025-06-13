import { useState, useEffect } from "react";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";
import handleLike from "./components/HandlesLike";
import LoadingSpinner from "./components/LoadingSpinner";
import { Footer } from "./styles/Footer";
import NavBar from "./components/NavBar";

export const App = () => {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state for fetching thoughts
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("usertoken") ? true : false
  );

  // Fetch thoughts when the app loads
  useEffect(() => {
    fetch("https://js-project-api-k17p.onrender.com/thoughts")
      .then((res) => res.json())
      .then((data) => {
        setThoughts(data);
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error(
          "Oh no! Previous thoughts are unavailable currently:",
          error
        );
        setLoading(false); // Stop loading even if there's an error
      });
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

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track the current search query

  return (
    <>
      <header>
        <NavBar
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </header>
      <main>
        {loading ? (
          <LoadingSpinner /> // Show loading message while fetching
        ) : (
          <>
            <MessageForm
              onSubmit={(newThought) => setThoughts([newThought, ...thoughts])}
            />
            <MessageList
              aria-live="polite"
              thoughts={searchResults.length > 0 ? searchResults : thoughts}
              onLike={onLike}
            />
          </>
        )}
      </main>
      <Footer>
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
      </Footer>
    </>
  );
};
