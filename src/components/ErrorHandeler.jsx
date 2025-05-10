import styled from "styled-components";

const ErrorMessage = styled.p`
  color: ${(props) => (props.isError ? "red" : "black")};
  text-align: right;
  margin: 0;
  padding: 0;
  max-width: 150px;
`;

export const ErrorHandeler = ({ userInput }) => {
  let characterErrorMessage = "";
  let isError = false;

  if (userInput.length >= 1 && userInput.length < 6) {
    characterErrorMessage = ": You need to enter more than 5 characters!";
    isError = true;
  } else if (userInput.length > 139) {
    characterErrorMessage = ": You can't enter more than 140 characters!";
    isError = true;
  }

  return (
    <ErrorMessage isError={isError}>
      {userInput.length}/140 {characterErrorMessage}
    </ErrorMessage>
  );
};