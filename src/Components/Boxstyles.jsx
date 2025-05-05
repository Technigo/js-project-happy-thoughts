import styled from "styled-components";

const PinkButton = styled.button`
  background-color: pink;
  padding: 0.75rem 0.5rem;
  border-radius: 2rem;
  border: none;
  font-family: "system-ui", sans-serif;
  font-weight: 600;
  *:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease-in-out;
  }
`;

const BoxStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding: 1rem;
  width: 34rem;
  min-height: 10rem;
  border: 2px solid black;
  box-shadow: 8px 8px 0px 0px black;
  margin-top: 2rem;
  align-self: center;

  p {
    font-family: "Avenir", sans-serif;
    font-weight: 500;
  }
`;

const BoxFooterStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  width: 100%;
  color: gray;
`;
const TextAreaStyle = styled.textarea`
  width: 100%;
  height: 5rem;
  padding: 0.75rem;
  font-family: "ariel", sans-serif;
  font-weight: 475;
  font-size: 1rem;
  border: 2px solid lightgray;
  resize: none;
`;

export { PinkButton, BoxStyle, BoxFooterStyle, TextAreaStyle };
