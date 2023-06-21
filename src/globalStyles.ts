import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
  }

  h1, h2, h3, h4, p {
    margin: 0;
  }

  button {
    cursor: pointer;
  }

  button, input, select {
    border: none;
    outline: 0;
    background-color: transparent;
  }
`;

export default GlobalStyle;
