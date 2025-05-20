import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    width: 400px;
    margin: auto;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`