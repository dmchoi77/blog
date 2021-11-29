import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Main from './Main';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './reducer';

const createStoreWitdhMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
const rootElement = document.getElementById('root');


if (rootElement.hasChildNodes()) {
  hydrate(
    <BrowserRouter>
      <Provider
        store={createStoreWitdhMiddleware(Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
        <Main />
      </Provider>
    </BrowserRouter>,
    rootElement
  );
} else {
  render(
    <BrowserRouter>
      <Provider
        store={createStoreWitdhMiddleware(Reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
        <Main />
      </Provider>
    </BrowserRouter>
    , rootElement
  );
}