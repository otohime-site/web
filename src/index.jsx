import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import rootReducer from './reducers';

const composedCreateStore = applyMiddleware(promiseMiddleware())(createStore);
const store = composedCreateStore(rootReducer);
const root = document.getElementById('root');
render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), root,
);
