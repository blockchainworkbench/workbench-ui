import {combineReducers} from "redux";
import userSettings from './user-settings';
import pages from './pages';
import appState from './app-state';

export default combineReducers({
    userSettings,
    appState,
    pages
});