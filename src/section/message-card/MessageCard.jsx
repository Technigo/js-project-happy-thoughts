import styled from "styled-components";

import { ErrorHandeler } from "../../components/ErrorHandeler";
import { UserSignin } from "../UserSignin";

//#region ---- STYLING ----

const MessageCardWrapper = styled.fieldset`
display: flex;
flex-direction: column;
justify-content: center;
background-color: #eeeeee;
border: 1px solid black;
border-radius: 2px;
width: 280px;
margin: 0 auto;
padding: 12px 18px;
gap: 12px;
box-shadow: 10px 10px 0 rgba(0, 0, 0, 1);

textarea {
/* border: solid 2px ${(props) => (props.maxCharacterIndicator ? "red" : "white")}; */
height: 80px;
width: 100%;
padding: 10px 20px;
cursor: pointer;
padding-bottom: 35px;
}

button {
  background-color: pink;
  border-radius: 50px;
  width: 75%;
  border: none;
  padding: 12px;
  margin: 12px 0;
  cursor: pointer;
  transition: ease .3s;

  &:hover {
  background-color: #f0aeae;
  transform: scale(1.03);
  }
}

@media (min-width: 640px) {
width: 620px;
}
`

const ExtraWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`

//#endregion

//#region ---- FUNCTIONS ----

export const MessageCard = ({ userInput, setUserInput, comment, setApiNewId }) => {

  const apiUrl = "https://js-project-api-afon.onrender.com/thoughts"
  //const apiUrl = "http://localhost:8080/thoughts"

  const handleSubmit = (event) => {
//https://happy-thoughts-api-4ful.onrender.com/thoughts
    fetch(`${apiUrl}`, {
      method: "POST",
      body: JSON.stringify({
        message: userInput,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((newThought) => {
        setApiNewId(newThought._id)
        // setMessages((previousThoughts) => [newThought, ...previousThoughts])
      })
    comment(event, userInput);
  };

  const EnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey == false) { //keyCode 13 is the enter key
      e.preventDefault();
      handleSubmit(e); // Submit when Enter is pressed       
    }
  }

  //#endregion

  return (
    <>
      
      <section>
        <form
          onSubmit={handleSubmit}>
          <MessageCardWrapper>
            <p>What´s making you happy right now?</p>
            <label>
              <textarea
                maxLength={140}
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
                placeholder="Write something happy!"
                onKeyDown={EnterPress}
              ></textarea>
            </label>
            <ExtraWrapper>
              <button
                type="submit"
                disabled={userInput.trim().length <= 5 || userInput.trim().length >= 141}
              >
                ❤️ Send Happy Thoughts ❤️</button>
              <ErrorHandeler userInput={userInput} setUserInput={setUserInput} />
            </ExtraWrapper>
          </MessageCardWrapper>

        </form >
      </section>
      



    </>

  )
}
