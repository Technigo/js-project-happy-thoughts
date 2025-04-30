import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  :root {
    --color-primary: #ffadad;
    --color-secondary: #ff6b6b;
    --color-tertiary: #ff3d3d;
    --color-background: #f2f0f0;
    --color-text: #333;
    --color-border: #ccc;
  }
  
  body {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  }
`
