import {ACTIONS, EXERCISE_STATE} from "../../actions";

export default function (state = [], action) {
    switch (action.type) {
        case ACTIONS.RUN_EXERCISE:
            console.log('run_ex', action);
            const newExercise = {
                codeId: action.codeId,
                state: EXERCISE_STATE.STARTING,
                message: "Starting",
                validation: action.validation,
            };

            const newState = [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return newExercise;
                } else return ex;
            })];

            if (newState.find(ex => ex.codeId === action.codeId) === undefined) {
                newState.push(newExercise);
            }
            return newState;

        case ACTIONS.COMPILE:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        state: EXERCISE_STATE.COMPILING,
                        message: "Compiling contracts"
                    });
                } else return ex;
            })];

        case ACTIONS.COMPILE_SUCCESS:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        state: EXERCISE_STATE.COMPILED,
                        message: "Successfully compiled.",
                        code: action.code
                    })
                } else return ex;
            })];

        case ACTIONS.COMPILE_FAILURE:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        state: EXERCISE_STATE.ERROR,
                        message: "Compile Error",
                        error: action.error
                    });
                } else return ex;
            })];

        case ACTIONS.DEPLOY_CONTRACTS:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        state: EXERCISE_STATE.DEPLOYING,
                        message: "Deploying contracts"
                    });
                } else return ex;
            })];


        case ACTIONS.DEPLOY_CONTRACTS_UPDATE:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        message: action.message,
                        state: EXERCISE_STATE.DEPLOYING
                    });
                } else return ex;
            })];

        case ACTIONS.DEPLOY_CONTRACTS_FAILURE:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                            message: "Deployment Error", error: action.error,
                            state: EXERCISE_STATE.ERROR
                        }
                    );
                } else return ex;
            })];

        case ACTIONS.DEPLOY_CONTRACTS_SUCCESS:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        message: action.message,
                        addresses: action.addresses,
                        state: EXERCISE_STATE.DEPLOYED
                    });
                } else return ex;
            })];

        case ACTIONS.TEST_CONTRACTS:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        message: "Testing contracts",
                        state: EXERCISE_STATE.TESTING
                    });
                } else return ex;
            })];

        case ACTIONS.TEST_CONTRACTS_UPDATE:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        message: action.message,
                        state: EXERCISE_STATE.TESTING
                    });
                } else return ex;
            })];

        case ACTIONS.TEST_CONTRACTS_SUCCESS:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        message: "Exercise completed.",
                        state: EXERCISE_STATE.SUCCESS
                    });
                } else return ex;
            })];

        case ACTIONS.TEST_CONTRACT_FAILURE:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        message: "Tests failed",
                        error: action.error,
                        state: EXERCISE_STATE.ERROR
                    });
                } else return ex;
            })];

        default:
            return state;
    }
};