import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`


  /* CSS Variables */
  :root {
    --font-main: 'Roboto Mono', monospace;
    --font-ui: 'Lexend', sans-serif;    
    --color-bg: #FFFFFF;
    --color-bg-card: #F2F0F0;
    --color-grey: #E6E4E4;
    --color-black: #000000;
    --color-text: #000000;
    --color-dark-grey: #AFADAD;
    --color-red: #FFAEAE;
    --link-color: #000000;
    --link-hover-color: #FFAEAE;
        font-size: 14px;

  }

  /* Global Reset & Base Styles */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  html, body {
    font-family: var(--font-main), sans-serif;
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  #root {
    isolation: isolate;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
    font-family: var(--font-main);

  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  p {
    text-wrap: pretty;
  }

  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }

  a, button {
    cursor: pointer;
  }

  a {
  color: var(--link-color);
}

  a:hover {
  font-weight: 600;
}

  a:visited {
  color: var(--link-color);
}

`;

export default GlobalStyle;
