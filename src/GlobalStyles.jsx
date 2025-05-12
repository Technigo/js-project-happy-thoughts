import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  display: flex;
  justify-content: center;
  background-color:rgba(224, 203, 200, 0.23);
  font-family: roboto mono;
}

  h1 {
    display: flex;
    justify-content: center;
    font-family: verdana;
    margin: 20px 0 16px;
    font-size: 48px;
    color:#FF5364
  }

  p {
    line-height: 1.6;
    margin: 0 0 16px;
    font-size: 17px;
  }
`;
