import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './containers/app';
import Root from './containers/root';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

render(
  <Root store={store}>
    <App />,
  </Root>,
  document.getElementById('root')
);
