import {ACTIONS} from '../actions';

const pages = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.LOAD_PAGES_SUCCESS:
            return [...action.pages];
        case ACTIONS.LOAD_PAGE_CONTENT_SUCCESS:
            return [...state.map(page => {
                if (page.url === action.page.url) {
                    return Object.assign({}, page, action.page);
                } else {
                    return page;
                }
            })];
        default:
            return state;
    }
};

export default pages;