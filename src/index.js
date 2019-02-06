import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from 'react-redux';
import store from './store';
import Web3 from 'web3';

if (!Web3) console.log('Web3 not loaded');
window.store = store;

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));
