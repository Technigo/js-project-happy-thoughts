import styled from "styled-components";

const PinkButton = styled.button`
  background-color: pink;
  padding: 0.75rem 0.5rem;
  border-radius: 2rem;
  border: none;
  font-family: "system-ui", sans-serif;
  font-weight: 600;
  will-change: transform;

  &:active {
    transform: scale(0.97);
    transition: all 0.1s ease-in-out;
    box-shadow: inset 0px 4px 6px 0px lightcoral;
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
  margin: 2rem 0;
  align-self: center;
  word-break: break-word;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  hyphens: auto;

  p {
    font-family: "Avenir", sans-serif;
    font-weight: 500;
  }
  @media (max-width: 543px) {
    width: 90%;
    height: 15rem;
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
  overflow-wrap: break-word;
  word-break: break-all;

  @media (max-width: 543px) {
    width: 100%;
    height: 32rem;
    padding: 0.5rem;
  }
`;

export { PinkButton, BoxStyle, BoxFooterStyle, TextAreaStyle };
