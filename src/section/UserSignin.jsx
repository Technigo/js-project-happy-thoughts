import styled from "styled-components"

import { EditIcon } from "../components/icons/EditIcon"
import { SaveIcon } from "../components/icons/SaveIcon"

const UserSigninWrapper = styled.section`
  /* display: flex;
  flex-direction: row;
  justify-content: left;
  border: 1px solid #000;
  box-shadow: 10px 10px 0 rgba(0, 0, 0, 1);
  width: 280px;
  margin: 28px auto;
  padding: 12px 18px;
  gap: 12px; */

  @media (min-width: 640px) {
    width: 620px;    
  }

  /* input{
    height: 80px;
    width: 100%;    
  } */

  div{
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%; */
  }

  form {
  background: #f1f1f1;
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 8px 8px 0 #000;
  border-radius: 8px;
  font-family: 'Segoe UI', sans-serif;
  }

  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
  }

  button{
    padding: 0.6rem;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #444;
  }


`

export const UserSignin = () => {
  return(
    <UserSigninWrapper>
      <form>
        <fieldset>          
          <div>
            <label for="email"></label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="e.g., myusername@mail.com"/>
          </div>
          <div>
            <label for="password"></label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="something secret"/>
          </div>
          <div>
            <button type="submit"><SaveIcon/></button>
            
          </div>      
        </fieldset>
        
      </form>
    </UserSigninWrapper>
  )  
}