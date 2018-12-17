import {ACTIONS} from '../actions';
import {combineReducers} from "redux";

const pagesLoading = (state = false, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_PAGES:
            return true;
        case ACTIONS.PAGES_LOAD_ERROR:
        case ACTIONS.PAGES_LOAD_SUCCCESS:
            return false;
        default:
            return state;
    }
};

const pagesError = (state = null, action) => {
    switch (action.type) {
        case ACTIONS.PAGES_LOAD_ERROR:
            return action.error;
        default:
            return state;
    }
};

const pages = combineReducers({
    loading: pagesLoading,
    error: pagesError
});
export default combineReducers({pages});