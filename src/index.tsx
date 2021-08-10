import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';
import App from './App';
import GlobalStyle from './GlobalStyles';

ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </HashRouter>,
  document.getElementById('app'),
);

// @ts-ignore
if (module.hot && module.hot.accept) module.hot.accept();
