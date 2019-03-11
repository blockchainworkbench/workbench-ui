import {ACTIONS, EXERCISE_STATE} from "../../actions";

export default function (state = [], action) {
    switch (action.type) {
        case ACTIONS.RUN_EXERCISE:
            const newExercise = {
                codeId: action.codeId,
                state: EXERCISE_STATE.STARTING,
                message: "Starting",
                validation: action.validation,
                errorCount: 0,
            };
            const newState = [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    newExercise.errorCount = ex.errorCount;
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
                        errorCount: ex.errorCount + 1 || 1,
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
                            errorCount: ex.errorCount + 1 || 1,
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
                        state: EXERCISE_STATE.SUCCESS,
                        errorCount: 0
                    });
                } else return ex;
            })];

        case ACTIONS.TEST_CONTRACT_FAILURE:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        errorCount: ex.errorCount + 1 || 1,
                        message: "Tests failed",
                        error: action.error,
                        state: EXERCISE_STATE.ERROR
                    });
                } else return ex;
            })];

        case ACTIONS.EXERCISE_ERROR:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        message: "Error",
                        errorCount: ex.errorCount + 1 || 1,
                        error: action.error,
                        state: EXERCISE_STATE.ERROR
                    });
                } else return ex;
            })];

        case ACTIONS.EXERCISE_UPDATE:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {
                        message: action.message,
                        state: action.exerciseType || ex.state
                    });
                } else return ex;
            })];

        case ACTIONS.EXERCISE_ERRORCOUNT_RESET:
            return [...state.map(ex => {
                if (ex.codeId === action.codeId) {
                    return Object.assign({}, ex, {errorCount: 0});
                } else return ex;
            })];

        default:
            return state;
    }
};
