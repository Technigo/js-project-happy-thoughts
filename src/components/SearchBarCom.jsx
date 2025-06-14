import styled from "styled-components";
import { useState } from "react";

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
`;

const API_URL =
  import.meta.env.VITE_API_URL || "https://js-project-api-k17p.onrender.com";

const SearchBar = ({ onResults, setQuery }) => {
  const [query, setLocalQuery] = useState("");

  const handleChange = async (e) => {
    const value = e.target.value;
    setLocalQuery(value);
    setQuery && setQuery(value); // Pass up the query to parent

    if (value.trim() === "") {
      onResults([]); // Clear results if input is empty
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/thoughts/search/${encodeURIComponent(value)}`
      );
      const results = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      onResults(results);
    } catch {
      onResults([]);
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Search 🌝 ..."
        value={query}
        onChange={handleChange}
        autoComplete="on"
        role="searchbox"
        aria-label="Search happy thoughts"
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
