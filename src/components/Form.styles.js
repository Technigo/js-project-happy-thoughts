import styled from "styled-components";

export const FormWrapper = styled.section`
  max-width: 450px;
  margin: 5px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background: rgb(237, 237, 237);
  width: 100%;
  border: 1px solid #ccc;
  padding: 16px;
  box-shadow: 7px 7px 0px rgb(0, 0, 0);
`;

export const StyledLabel = styled.label`
  color: rgb(0, 0, 0);
  font-size: 16px;
  margin: 0px 0px 10px;
`;

export const StyledTextarea = styled.textarea`
  outline: none;
  width: 100%;
  border: 1px solid #cccccc;
  padding: 15px;
  font-size: 15px;
  font-family: inherit;
  resize: none;

  &::placeholder {
    color: #aaa;
    font-size: 13px;
  }

  &:focus {
    border: 2px solid pink;
  }
`;

export const StyledInfoCharacterText = styled.p`
  font-size: 14px;
  margin: 0px;
  color: ${(props) => (props.$exceedsLimit ? "red" : "#333333")};
`;

export const StyledButton = styled.button`
  display: flex;
  width: 250px;
  font-family: inherit;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  border-radius: 25px;
  background-color: rgb(255, 166, 178);
  color: black;
  font-size: 16px;
  cursor: pointer;
  margin: 10px 0px;

  &:hover {
    background-color: pink;
  }
`;

export const StyledErrorMessage = styled.p`
  color: red;
  margin: 0px;
  font-size: 14px;
  font-weight: 500;
`;
