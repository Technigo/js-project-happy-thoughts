import { useState } from "react";
import { NavStyle, NavTitle, NavActions } from "../styles/NavStyles";
import { PinkButton } from "../styles/Messagestyles";
import SearchBar from "./Searchbar";
import { Suspense, lazy } from "react";
const LoginForm = lazy(() => import("./LoginForm"));

const NavBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Track the current search query
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("userToken");
    return !!token;
  });

  return (
    <>
      <NavStyle>
        <NavTitle> Send Your Happy Thoughts </NavTitle>
        <NavActions>
          {searchQuery.trim() !== "" && searchResults.length === 0 && (
            <h4 style={{ display: "flex", padding: "0", margin: "0" }}>
              Not found
            </h4>
          )}
          <SearchBar
            onResults={(res) => setSearchResults(res)}
            setQuery={setSearchQuery}
          />
          {!isLoggedIn && (
            <PinkButton onClick={() => setShowLogin(true)}>Login</PinkButton>
          )}
          {showLogin && (
            <Suspense fallback={<div>Loading...</div>}>
              <LoginForm
                onClose={() => {
                  setShowLogin(false);
                  setIsLoggedIn(!!localStorage.getItem("userToken"));
                }}
              />
            </Suspense>
          )}
          {isLoggedIn && (
            <PinkButton
              onClick={() => {
                localStorage.removeItem("userToken");
                sessionStorage.clear();
                setIsLoggedIn(false); // If you track login state in React
                setShowLogin(false); // Optionally close login modal
              }}
            >
              Logout
            </PinkButton>
          )}
        </NavActions>
      </NavStyle>
    </>
  );
};

export default NavBar;
