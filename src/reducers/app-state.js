import {ACTIONS} from '../actions';
import {combineReducers} from "redux";

const pagesLoading = (state = false, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_PAGES:
            return true;
        case ACTIONS.LOAD_PAGES_FAILURE:
        case ACTIONS.LOAD_PAGES_SUCCESS:
            return false;
        default:
            return state;
    }
};

const pagesError = (state = null, action) => {
    switch (action.type) {
        case ACTIONS.LOAD_PAGES_FAILURE:
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