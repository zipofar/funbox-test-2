import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers';
import App from './components/App';

let store;
if (process.env.NODE_ENV === 'development') {
  const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
  const devtoolMiddleware = ext && ext();
  store = createStore(RootReducer, compose(applyMiddleware(thunk), devtoolMiddleware));
} else {
  store = createStore(RootReducer, compose(applyMiddleware(thunk)));
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
);