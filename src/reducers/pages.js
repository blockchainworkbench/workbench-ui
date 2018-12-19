import {ACTIONS} from '../actions';

const pages = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.LOAD_PAGES_SUCCESS:
            return [...action.pages];
        default:
            return state;
    }
};

export default pages;