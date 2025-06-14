import { NavStyle, NavTitle, NavActions } from "../styles/NavStyles";
import { PinkButton } from "../styles/Messagestyles";
import SearchBar from "./SearchBarCom";
import { Suspense, lazy } from "react";
const LoginForm = lazy(() => import("./LoginForm"));

const NavBar = ({
  searchResults,
  setSearchResults,
  searchQuery,
  setSearchQuery,
  showLogin,
  setShowLogin,
  isLoggedIn,
  setIsLoggedIn,
}) => {
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
          <SearchBar onResults={setSearchResults} setQuery={setSearchQuery} />
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
                localStorage.removeItem("username");
                setIsLoggedIn(false);
                setShowLogin(false);
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
