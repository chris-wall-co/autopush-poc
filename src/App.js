import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Form from './components/Form';
import Modal from './components/Modal';
import { initStore } from './state';
import { Provider } from 'react-redux';
import { unstash } from './state/stash';


const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  html, body, #root {
    height: 100vh;
    width: 100vw;
    border: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    background-color: ${({ theme }) => theme.bodyBg};
    overflow: hidden;
  }

  dialog::backdrop {
    background-color: rgba(0, 0, 0, .35);
  }
`;

const theme = Object.freeze({
  bodyBg: '#14213d',
  buttonBg: '#fca311',
  buttonFg: '#14213d',
  formBg: '#fefefe',
  formFg: '#1a1a1a',
  buttonRowBg: '#e5e5e5',
  borderColor: '#fca311',
});

const store = initStore(Object.freeze({
  version: process.env.REACT_APP_VERSION,
  versionChanged: false,
  formData: unstash(),
}));

const Layout = styled.main`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  & > div {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 75%;
    width: 50%;
  }
`;

export default () =>  (
  <ThemeProvider theme={theme}>
    <Global />
    <Provider store={store}>
      <Layout>
        <div>
          <Form />
          <Modal />
        </div>
      </Layout>
    </Provider>
  </ThemeProvider>
);

