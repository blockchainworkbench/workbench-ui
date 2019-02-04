import {combineReducers} from "redux";

import pagesReducers from './pages';
import web3AccountReducers from './web3-account';
import solidityReducers from './solidity';

const pages = combineReducers(pagesReducers);
const web3Account = combineReducers(web3AccountReducers);
const solidity = combineReducers(solidityReducers);

export default combineReducers({pages, web3Account, solidity});