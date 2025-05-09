import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: white;
    color: #333;
    line-height: 1.4;
    min-width: 280px;
    overflow-x: hidden;
  }
`;

export default GlobalStyle; 