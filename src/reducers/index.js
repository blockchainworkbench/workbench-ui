import {combineReducers} from "redux";
import userSettings from './user-settings';
import pages from './pages';
import categories from './categories';
import appState from './app-state';

export default combineReducers({
    userSettings,
    appState,
    pages,
    categories
});