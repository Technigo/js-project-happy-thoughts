import styled from "styled-components"

const FormWrapper = styled.form `
  border-radius: 3px;
  border: 1px solid var(--color-border);
  box-shadow: 4px 6px 2px rgba(0, 0, 0, 0.8);
  max-width: fit-content;
  margin: 0 auto;
  background-color: var(--color-background);


  @media (min-width: 360px) {
    display: flex; 
    flex-direction: column;
    gap: 10px; 
    align-items: flex-start;
    max-width: 600px;
    width: 100%;
  
  
    width: auto; 
    max-width: 500px; 
    margin-left: 10px;
    margin: 0 auto;
    
  }

  @media (min-width: 1024px) and (max-width: 1600px) {
    display: flex;
    flex-direction: column;
    gap: 10px; 
    align-items: flex-start;
    max-width: 600px;
    width: 100%;


    width: auto;
    max-width: 500px; 
    margin-left: 10px;
    margin: 0 auto;
    
}
`

const Label = styled.label `
  margin: 7px 7px 7px 7px;
`

const Textarea = styled.textarea `
  margin: 7px 7px 7px 7px;

   @media (min-width: 360px) 
    width: auto;
    max-width: 500px; 
    margin-left: 10px;


@media (min-width: 1024px) and (max-width: 1600px) {
width: auto;
    max-width: 500px; 
    margin-left: 10px;
  
}
`

const Button = styled.button `
  border-radius:12px;
  background-color: var(--color-button);
  width: auto;
  padding: 12px;
  content: cover;
  border: none;
  margin:6px 6px 6px 6px;



  Button:focus {
  border: 2px solid var(--color-border);

}


@media (min-width: 360px) {
  width: auto;
  max-width: 500px; 
  margin-left: 10px;


@media (min-width: 1024px) and (max-width: 1600px) {
    width: auto;
    max-width: 500px; 
    margin-left: 10px;
    
}
`


const Form = ({ messageText, setMessageText, handleMessage }) => {
  return (
    <FormWrapper onSubmit={handleMessage}>
        <Label htmlFor="input">What's making you happy right now?</Label>
        <Textarea
          id="input"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
        <Button type="submit"> ❤️ Send Happy Thought! ❤️</Button>
    </FormWrapper>
  )
}

export default Form
