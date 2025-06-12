import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: ${colors.background.white};
    color: ${colors.text.primary};
    line-height: 1.4;
    min-width: 280px;
    overflow-x: hidden;
  }
`;

export default GlobalStyle; 