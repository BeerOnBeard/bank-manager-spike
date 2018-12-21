import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store';
import socketAdapter from './socketAdapter';

import App from './App';

socketAdapter(store);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);
