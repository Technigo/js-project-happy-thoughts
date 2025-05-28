import { useState } from "react";
import { HeartIcon } from "./HeartIcon";
import {
  FormWrapper,
  StyledForm,
  StyledLabel,
  StyledTextarea,
  StyledInfoCharacterText,
  StyledButton,
  StyledErrorMessage,
} from "./Form.styles";

export const Form = ({ onSubmitMessage }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const maxLength = 140;
  const isTooLong = message.length > maxLength;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (message.length < 5) {
      setError("Your message is too short.");
      return;
    }

    if (message.length > maxLength) {
      setError("Your message is too long.");
      return;
    }

    setError("");

    onSubmitMessage(message);
    setMessage("");
  };

  const handleInputChange = (e) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    if (newMessage.length === 0) {
      setError("");
    } else if (newMessage.length < 5) {
      setError("Your message is too short.");
    } else if (newMessage.length > maxLength) {
      setError("Your message is too long.");
    } else {
      setError("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const errorMessageElement = error ? (
    <StyledErrorMessage>{error}</StyledErrorMessage>
  ) : null;


  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="thought">
          What's making you happy right now?
        </StyledLabel>

        <StyledTextarea
          id="thought"
          placeholder="Type your happy thought here..."
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <StyledInfoCharacterText $exceedsLimit={isTooLong}>
          {maxLength - message.length} characters remaining
        </StyledInfoCharacterText>

        {errorMessageElement}

        <StyledButton type="submit"
          title="Send happy thought"
        >
          <HeartIcon /> Send Happy Thought <HeartIcon />
        </StyledButton>
      </StyledForm>
    </FormWrapper>
  );
};
