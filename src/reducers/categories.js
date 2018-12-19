import {ACTIONS} from '../actions';

const categories = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.LOAD_PAGES_SUCCESS_SORTED:
            return Object.assign([], action.categories);
        default:
            return state;
    }
};

export default categories;