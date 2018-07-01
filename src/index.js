import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RootReducer from './reducers';
import App from './components/App';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

const store = createStore(RootReducer, compose(applyMiddleware(thunk), devtoolMiddleware));

ReactDOM.render(
    <Provider store = { store }>
        <App />
    </Provider>,
    document.getElementById('root'),
);