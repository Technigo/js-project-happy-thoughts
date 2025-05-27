import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f0f0;
    font-family: "Poppins", sans-serif;
    color: #333;
    margin: 0;
    padding: 10px;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }
`

export default GlobalStyle