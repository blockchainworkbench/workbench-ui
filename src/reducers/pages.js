import {ACTIONS} from '../actions';

const pages = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.PAGES_LOAD_SUCCCESS:
            return [...action.pages];
        default:
            return state;
    }
};

export default pages;