import styled from "styled-components";

const NavStyle = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  color: black;
  border: 2px solid black;
  background-color: #efeeee;
  width: 100%;
  flex-wrap: wrap;
`;

const NavTitle = styled.h1`
  font-family: "Avenir", sans-serif;
  font-size: 1.5rem;
  margin: 0;
`;
const NavActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export { NavStyle, NavTitle, NavActions };
