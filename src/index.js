import React from 'react';
import { render } from 'react-dom';
import storeFactory from './store/index';
import { Provider } from 'react-redux';
const { window, document } = global;
import { App } from './components/index';

const store = storeFactory();

window.React = React;
window.store = store;

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('react-container')
);
