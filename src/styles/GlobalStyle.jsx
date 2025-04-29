import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle` 

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    --color-text:  #36454F;
    --color-button: pink;
    --color-border: #202020;
    --color-background: #F5F5F5;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  line-height: 1.6;
  font-size: 16px;
 
}

h1 {
  text-align: center;
  color:#C08081;
}
  `
export default GlobalStyle