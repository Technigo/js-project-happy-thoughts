import styled from "styled-components";

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  padding: 1rem;
  background-color: lightpink;
  font-family: "Avenir", sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: black;
  text-align: center;

  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
      text-shadow: 0px 0px 5px red;
      transform: scale(1.05);
      transition: all 0.3s ease-in-out;
    }
  }
  p {
    margin: 0;
    padding: 0;
  }
`;
