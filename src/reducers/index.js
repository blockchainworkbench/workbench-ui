import {combineReducers} from "redux";
import userSettings from './user-settings';
import pages from './pages';
import categories from './categories';
import appState from './app-state/';
import testing from './testing';

export default combineReducers({
    userSettings,
    appState,
    pages,
    testing,
    categories
});
