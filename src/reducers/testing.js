import {combineReducers} from 'redux';
import {ACTIONS} from '../actions';
import {EXERCISE_STATE} from "../actions/exercise";

const error = (state = null, action) => {
    switch (action.type) {
        case ACTIONS.SET_EXERCISE:
            return action.error;
        default:
            return state;
    }
};

const exercise = (state = null, action) => {
    switch (action.type) {
        case ACTIONS.SET_EXERCISE:
            return action.exercise
                ? Object.assign({}, action.exercise, {state: null})
                : null;
        case ACTIONS.TEST_EXERCISE:
            return Object.assign({}, state,
                {state: EXERCISE_STATE.STARTING, error: null, message: "Starting"});
        case ACTIONS.TEST_EXERCISE_UPDATE:
            return Object.assign({}, state,
                {state: action.statusType || state.state, message: action.message});
        case ACTIONS.TEST_EXERCISE_ERROR:
            return Object.assign({}, state,
                {state: EXERCISE_STATE.ERROR, error: action.error});
        default:
            return state;
    }
};
export default combineReducers({
    error,
    exercise
});
