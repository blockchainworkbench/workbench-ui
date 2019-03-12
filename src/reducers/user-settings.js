import {combineReducers} from 'redux';
import {ACTIONS} from '../actions';
import {CATEGORY_FILTER_TYPE, DIFFICULTY} from "../actions/search";

const difficultyFilter = (state = DIFFICULTY.ALL, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_DIFFICULTY_FILTER:
            return action.difficulty;
        default:
            return state;
    }
};

const categoryFilter = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.ADD_CATEGORY_FILTER:
            return [...state, action.category];
        case ACTIONS.REMOVE_CATEGORY_FILTER:
            return [...state.filter(cat => cat !== action.category)];
        default:
            return state;
    }
};

const categoryFilterType = (state = CATEGORY_FILTER_TYPE.AND, action) => {
    switch (action.type) {
        case ACTIONS.CHANGE_CATEGORY_FILTER_TYPE:
            return action.filter_type;
        default:
            return state;
    }
};

export default combineReducers({
    difficultyFilter,
    categoryFilter,
    categoryFilterType
});
