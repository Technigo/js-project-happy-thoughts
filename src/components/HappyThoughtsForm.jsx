import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f0eeee;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid black;
  box-shadow: 8px 8px 0px black;
`;

const FormLabel = styled.label`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
`;

const StyledTextarea = styled.textarea`
  min-height: 4rem;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.4;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  border: 1px solid ${(props) => (props["aria-invalid"] ? "red" : "black")};
  resize: vertical;
`;

const FormButton = styled.button`
  display: inline-block;
  background-color: #ffa3a5;
  padding: 8px 16px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  align-self: flex-start;
`;

const CharacterCount = styled.p`
  font-size: 14px;
  color: ${(props) => (props.$exceeded ? "red" : "black")};
  margin: 0;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 0;
`;

const MAX_CHARACTERS = 140;
const MIN_CHARACTERS = 5;

export const HappyThoughtsForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isTooLong = message.length > MAX_CHARACTERS;
  const isTooShort = message.length > 0 && message.length < MIN_CHARACTERS;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isTooLong || isTooShort) {
      setError("Your happy thought must be between 5 and 140 characters.");
      return;
    }

    try {
      const response = await fetch(
        "https://happy-thoughts-api-4ful.onrender.com/thoughts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.errors?.message?.message || "Something went wrong.");
        return;
      }

      setError("");
      onSubmit(message);
      setMessage("");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
  };

  const handleChange = (event) => {
    const newMessage = event.target.value;
    setMessage(newMessage);

    if (
      newMessage.length >= MIN_CHARACTERS &&
      newMessage.length <= MAX_CHARACTERS
    ) {
      setError("");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormLabel htmlFor='messageInput'>
        What's making you happy right now?
      </FormLabel>

      <StyledTextarea
        id='messageInput'
        name='message'
        placeholder='Type your happy thought here...'
        value={message}
        onChange={handleChange}
        aria-invalid={isTooLong || isTooShort}
        required
      />

      <CharacterCount $exceeded={isTooLong}>
        {message.length} / {MAX_CHARACTERS}
      </CharacterCount>

      {error && <ErrorMessage role='alert'>{error}</ErrorMessage>}

      <FormButton type='submit'>❤️ Send Happy Thought ❤️</FormButton>
    </StyledForm>
  );
};
