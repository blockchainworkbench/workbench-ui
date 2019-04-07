import {combineReducers} from 'redux';
import {ACTIONS} from '../actions';
import {EXERCISE_STATE} from "../actions/exercise";
import {TEST_EXERCISE_CODE_ID} from "../actions/testing";

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
                ? Object.assign({}, action.exercise, {state: null}) : null;
        case ACTIONS.TEST_EXERCISE:
            return Object.assign({}, state,
                {state: EXERCISE_STATE.STARTING, error: null, message: "Starting"});
        case ACTIONS.TEST_EXERCISE_UPDATE:
            return Object.assign({}, state,
                {state: action.statusType || state.state, message: action.message});
        case ACTIONS.TEST_EXERCISE_ERROR:
            return Object.assign({}, state,
                {state: EXERCISE_STATE.ERROR, error: action.error});
        case ACTIONS.TEST_EXERCISE_COMPILE:
            return Object.assign({}, state,
                {message: "Compiling", state: EXERCISE_STATE.COMPILING, error: null});
        case ACTIONS.TEST_EXERCISE_COMPILE_FAILURE:
            return Object.assign({}, state,
                {message: "Compile Error", state: EXERCISE_STATE.ERROR, error: action.error});
        case ACTIONS.TEST_EXERCISE_DEPLOY:
            return Object.assign({}, state,
                {state: EXERCISE_STATE.DEPLOYING, error: null, message: "Deploying contracts"});
        case ACTIONS.TEST_EXERCISE_DEPLOY_FAILURE:
            return Object.assign({}, state,
                {message: "Deploy Error", state: EXERCISE_STATE.ERROR, error: action.error});
        case ACTIONS.TEST_CONTRACTS:
            if (action.codeId === TEST_EXERCISE_CODE_ID) {
                return Object.assign({}, state,
                    {message: "Testing contracts", state: EXERCISE_STATE.TESTING, error: null});
            } else return state;
        case ACTIONS.TEST_CONTRACTS_UPDATE:
            if (action.codeId === TEST_EXERCISE_CODE_ID) {
                return Object.assign({}, state,
                    {message: action.message, error: null});
            } else return state;
        case ACTIONS.TEST_CONTRACTS_SUCCESS:
            if (action.codeId === TEST_EXERCISE_CODE_ID) {
                return Object.assign({}, state,
                    {message: "Exercise completed.", state: EXERCISE_STATE.SUCCESS, error: null});
            } else return state;
        case ACTIONS.TEST_CONTRACT_FAILURE:
            if (action.codeId === TEST_EXERCISE_CODE_ID) {
                return Object.assign({}, state,
                    {message: "Testing Error", state: EXERCISE_STATE.ERROR, error: action.error});
            } else return state;
        default:
            return state;
    }
};
export default combineReducers({
    error,
    exercise
});
