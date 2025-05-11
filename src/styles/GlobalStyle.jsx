import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  /* Custom font */
  @font-face {
    font-family: 'TAN-Rosebud';
    src: url('/fonts/TAN-Rosebud.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  /* CSS Variables */
  :root {
    font-size: 16px;
    --font-main: monospace;
    --color-bg: #FFFFFF;
    --color-bg-card: #F2F0F0;
    --color-darkgrey: #C6C5C5;
    --color-black: #000000;
    --color-text: #000000;
    --color-like-grey: #EAEAEA;
    --color-like-red: #FFAEAE;
    --link-color: #000000;
    --link-hover-color: #FFAEAE;
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
    height: 100%; /*Vet ej om jag behöver denna men ev vid sticky footer etc*/
    font-family: var(--font-main);
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
