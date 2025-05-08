import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle` 

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    --color-text:  #36454F;
    --color-button: pink;
    --color-border: #202020;
    --color-background: #F5F5F5;
    --color-likebutton: #E0E0E0;
    --color-headline: #C08081;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  line-height: 1.6;
  font-size: 16px;


@media (min-width: 668px) {
font-size: 16px;
}

@media (min-width: 1024px) {
font-size: 18px;
}

}

h1 {
  text-align: center;
  color: var(--color-headline);
  font-size: 28px;


@media (min-width: 668px) {
font-size: 34px;
}

@media (min-width: 1024px) {
font-size: 40px;
}

}

  `
export default GlobalStyle