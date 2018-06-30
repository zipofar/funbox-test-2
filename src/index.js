import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './reducers';
import App from './components/App';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

const store = createStore(RootReducer, devtoolMiddleware);

ReactDOM.render(
    <Provider store = { store }>
        <App ymaps = { window.ymaps }/>
    </Provider>,
    document.getElementById('root'),
);