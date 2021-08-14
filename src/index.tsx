import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';
import { Provider } from 'react-redux';
import store from 'store';
import App from './App';
import GlobalStyle from './GlobalStyles';

ReactDOM.render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        <App />
      </Provider>
    </ThemeProvider>
  </HashRouter>,
  document.getElementById('app'),
);

// @ts-ignore
if (module.hot && module.hot.accept) module.hot.accept();
