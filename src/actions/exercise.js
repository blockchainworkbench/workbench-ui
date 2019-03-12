const ACTIONS = {
    LOAD_COMPILER: "LOAD_COMPILER",
    LOAD_COMPILER_SUCCESS: "LOAD_COMPILER_SUCCESS",
    LOAD_COMPILER_FAILURE: "LOAD_COMPILER_FAILURE",
    COMPILE: "COMPILE",
    COMPILE_SUCCESS: "COMPILE_SUCCESS",
    COMPILE_FAILURE: "COMPILE_FAILURE",
    DEPLOY_CONTRACTS: "DEPLOY_CONTRACTS",
    DEPLOY_CONTRACTS_FAILURE: "DEPLOY_CONTRACTS_FAILURE",
    DEPLOY_CONTRACTS_SUCCESS: "DEPLOY_CONTRACTS_SUCCESS",
    DEPLOY_CONTRACTS_UPDATE: "DEPLOY_CONTRACTS_UPDATE",
    TEST_CONTRACTS: "TEST_CONTRACTS",
    TEST_CONTRACTS_UPDATE: "TEST_CONTRACTS_UPDATE",
    TEST_CONTRACTS_SUCCESS: "TEST_CONTRACTS_SUCCESS",
    TEST_CONTRACT_FAILURE: "TEST_CONTRACTS_FAILURE",
    RUN_EXERCISE: "RUN_EXERCISE",
    EXERCISE_ERROR: "EXERCISE_ERROR",
    EXERCISE_UPDATE: "EXERCISE_UPDATE",
    EXERCISE_ERRORCOUNT_RESET: "EXERCISE_ERRORCOUNT_RESET"
};

export const EXERCISE_ACTIONS = ACTIONS;

export const EXERCISE_STATE = {
    STARTING: "starting",
    COMPILING: "compiling",
    COMPILED: "compiled",
    AUTHORIZING: "authorizing",
    DEPLOYING: "deploying",
    DEPLOYED: "deployed",
    TESTING: "testing",
    SUCCESS: "success",
    ERROR: "error"
};

export const COMPILER_STATE = {
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
};

export const loadCompiler = version => ({
    type: ACTIONS.LOAD_COMPILER,
    version: version
});

export const loadCompilerSuccess = (version, compiler) => ({
    type: ACTIONS.LOAD_COMPILER_SUCCESS,
    version: version,
    compiler: compiler
});

export const loadCompilerFailure = (version, error) => ({
    type: ACTIONS.LOAD_COMPILER_FAILURE,
    version: version,
    error: error
});

export const compile = (codeId, compiler, userSolution, exerciseSolution, optimize) => ({
    type: ACTIONS.COMPILE,
    codeId: codeId,
    compiler: compiler,
    userSolution: userSolution,
    exerciseSolution: exerciseSolution,
    optimize: optimize
});

export const compileFailure = (codeId, error) => ({
    type: ACTIONS.COMPILE_FAILURE,
    codeId: codeId,
    error: error
});

export const compileSuccess = (codeId, compiledCode) => ({
    type: ACTIONS.COMPILE_SUCCESS,
    codeId: codeId,
    code: compiledCode
});

export const deploy = (codeId, contracts) => ({
    type: ACTIONS.DEPLOY_CONTRACTS,
    codeId: codeId,
    contracts: contracts
});

export const deploySuccess = (codeId, addresses, message) => ({
    type: ACTIONS.DEPLOY_CONTRACTS_SUCCESS,
    codeId: codeId,
    addresses: addresses,
    message: message
});

export const deployFailure = (codeId, error) => ({
    type: ACTIONS.DEPLOY_CONTRACTS_FAILURE,
    codeId: codeId,
    error: error
});

export const deployUpdate = (codeId, stateMessage) => ({
    type: ACTIONS.DEPLOY_CONTRACTS_UPDATE,
    codeId: codeId,
    message: stateMessage
});

export const testContracts = (codeId, validation, addresses) => ({
    type: ACTIONS.TEST_CONTRACTS,
    codeId: codeId,
    validation: validation,
    addresses: addresses
});

export const testContractsUpdate = (codeId, message) => ({
    type: ACTIONS.TEST_CONTRACTS_UPDATE,
    codeId: codeId,
    message: message
});

export const testContractsSuccess = (codeId) => ({
    type: ACTIONS.TEST_CONTRACTS_SUCCESS,
    codeId: codeId
});

export const testContractsFailure = (codeId, error) => ({
    type: ACTIONS.TEST_CONTRACT_FAILURE,
    codeId: codeId,
    error: error
});

export const setExerciseError = (codeId, error) => ({
    type: ACTIONS.EXERCISE_ERROR,
    codeId: codeId,
    error: error
});

export const setExerciseUpdate = (codeId, message, type = null) => ({
    type: ACTIONS.EXERCISE_UPDATE,
    codeId: codeId,
    message: message,
    exerciseType: type
});

export const resetExerciseErrorCount = (codeId) => ({
    type: ACTIONS.EXERCISE_ERRORCOUNT_RESET,
    codeId: codeId
});

export const runExercise = (codeId, compilerVersion, userSolution, exerciseSolution, validation, optimize) => ({
    type: ACTIONS.RUN_EXERCISE,
    codeId: codeId,
    compilerVersion: compilerVersion,
    userSolution: userSolution,
    exerciseSolution: exerciseSolution,
    validation: validation,
    optimize: optimize
});
