import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;       
    /* margin: 0;
    padding: 0;     */
  }

header{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* div{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */

fieldset{
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

  @media (min-width: 640px) {
    width: 620px;
  }

}  

textarea {
  height: 80px;
  width: 100%;
  max-width: 450px;
  padding: 10px 20px;
  cursor: pointer;
  padding-bottom: 35px;
}

button {
    background-color: #eeeeee;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    transition: ease .3s;

    &:hover {
      background-color: #f0aeae;
      transform: scale(1.03);
    }
  }

`