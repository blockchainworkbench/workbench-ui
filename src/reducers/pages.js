import {ACTIONS} from '../actions';

const pages = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.LOAD_PAGES_SUCCESS:
            return [...action.pages];
        case ACTIONS.LOAD_PAGE_CONTENT_SUCCESS:
            return [...state.map(page => {
                if (page.url === action.page.url) {
                    return Object.assign({}, page, {loading: false, content: action.page.content});
                } else {
                    return page;
                }
            })];
        case ACTIONS.LOAD_PAGE_CONTENT:
            return [...state.map(page => {
                if (page.url === action.pageUrl) {
                    return Object.assign({}, page, {loading: true});
                } else {
                    return page;
                }
            })];
        case ACTIONS.LOAD_PAGE_CONTENT_FAILURE:
            return [...state.map(page => {
                if (page.url === action.page.url) {
                    return Object.assign({}, page,{loading: false, error: action.error});
                } else {
                    return page;
                }
            })];
        default:
            return state;
    }
};

export default pages;
