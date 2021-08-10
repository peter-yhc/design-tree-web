import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

const GlobalStyle = createGlobalStyle<{theme: ThemeType}>`
  html, body {
    margin: 0;
    padding: 0;
    font-family: "Nunito", Arial, sans-serif;
    font-size: 16px;
    height: 100%;
  }

  #app {
    height: 100%;
  }

  h1 {
    font-size: 2em;
    font-weight: 700;
    font-family: "Rubik", sans-serif;
  }

  h2 {
    font-size: 1.5em;
    font-weight: 700;
    font-family: "Rubik", sans-serif;
  }

  h3 {
    font-size: 1.17em;
    font-weight: 600;
    font-family: "Rubik", sans-serif;
  }

  h4 {
    font-size: 1em;
    font-weight: 600;
  }

  h5 {
    font-size: 0.83em;
    font-weight: bold;
  }

  h6 {
    font-size: 0.67em;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${(props) => props.theme.colours.black};
  }

  button, input, textarea, select {
    font-size: inherit;
    font-family: inherit;
    color: ${(props) => props.theme.colours.black};
  }
`;

export default GlobalStyle;
