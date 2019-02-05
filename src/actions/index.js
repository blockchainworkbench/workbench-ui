export const ACTIONS = {
    UPDATE_DIFFICULTY_FILTER: "UPDATE_DIFFICULTY_FILTER",
    ADD_CATEGORY_FILTER: "ADD_CATEGORY_FILTER",
    REMOVE_CATEGORY_FILTER: "REMOVE_CATEGORY_FILTER",
    CHANGE_CATEGORY_FILTER_TYPE: "CHANGE_CATEGORY_FILTER_TYPE",
    SELECT_PAGE: "SELECT_PAGE",
    LOAD_PAGES: "LOAD_PAGES",
    LOAD_PAGES_SUCCESS: "LOAD_PAGES_SUCCESS",
    LOAD_PAGES_FAILURE: "LOAD_PAGES_FAILURE",
    LOAD_PAGES_SUCCESS_SORTED: "LOAD_PAGES_SORTED",
    LOAD_PAGE_CONTENT: "LOAD_PAGE_CONTENT",
    LOAD_PAGE_CONTENT_SUCCESS: "LOAD_PAGE_CONTENT_SUCCESS",
    LOAD_PAGE_CONTENT_FAILURE: "LOAD_PAGE_CONTENT_FAILURE",
    CHECK_WEB3_ACCOUNT: "CHECK_WEB3_ACCOUNT",
    CHECK_WEB3_ACCOUNT_SUCCESS: "CHECK_WEB3_ACCOUNT_SUCCESS",
    CHECK_WEB3_ACCOUNT_FAILURE: "CHECK_WEB3_ACCOUNT_FAILURE",
    WEB3_ACCOUNT_UPDATE: "WEB3_ACCOUNT_UPDATE",
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
    RUN_EXERCISE: "RUN_EXERCISE"
};

export const DIFFICULTY = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard",
    ALL: "all"
};

export const CATEGORY_FILTER_TYPE = {
    AND: "and",
    OR: "or"
};

export const WEB3_ACCOUNT_STATE = {
    PENDING: "pending",
    UNSUPPORTED: "unsupported",
    AUTHORIZED: "auth",
    UNAUTHORIZED: "unauth"
};

export const COMPILER_STATE = {
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
};

export const CODE_STATE = {
    COMPILING: "compiling",
    COMPILED: "compiled",
    ERROR: "error"
};

export const DEPLOY_STATE = {
    DEPLOYING: "deploying",
    DEPLOYED: "deployed",
    ERROR: "error"
};

export const TEST_STATE = {
    TESTING: "testing",
    SUCCESS: "success",
    FAILED: "failed"
};

// ============================================================
// Action creators
// ============================================================
export const updateDifficultyFilter = difficulty => ({
    type: ACTIONS.UPDATE_DIFFICULTY_FILTER,
    difficulty: difficulty
});

export const addCategoryFilter = category => ({
    type: ACTIONS.ADD_CATEGORY_FILTER,
    category: category
});

export const removeCategoryFilter = category => ({
    type: ACTIONS.REMOVE_CATEGORY_FILTER,
    category: category
});

export const changeCategoryFilterType = filter_type => ({
    type: ACTIONS.CHANGE_CATEGORY_FILTER_TYPE,
    filter_type: filter_type
});

export const selectPage = pageId => ({
    type: ACTIONS.SELECT_PAGE,
    pageId: pageId
});

export const loadPagesSuccess = pages => ({
    type: ACTIONS.LOAD_PAGES_SUCCESS,
    pages: pages
});

export const loadPagesFailure = error => ({
    type: ACTIONS.LOAD_PAGES_FAILURE,
    error: error
});

export const loadPages = () => ({
    type: ACTIONS.LOAD_PAGES
});

export const loadPagesSuccessSorted = categories => ({
    type: ACTIONS.LOAD_PAGES_SUCCESS_SORTED,
    categories: categories
});

export const loadPageContent = (pageUrl) => ({
    type: ACTIONS.LOAD_PAGE_CONTENT,
    pageUrl: pageUrl
});

export const loadPageContentSuccess = page => ({
    type: ACTIONS.LOAD_PAGE_CONTENT_SUCCESS,
    page: page
});

export const loadPageContentFailure = (error, page) => ({
    type: ACTIONS.LOAD_PAGE_CONTENT_FAILURE,
    error: error,
    page: page
});

export const checkWeb3Account = () => ({
    type: ACTIONS.CHECK_WEB3_ACCOUNT
});

export const checkWeb3AccountSuccess = () => ({
    type: ACTIONS.CHECK_WEB3_ACCOUNT_SUCCESS
});

export const checkWeb3AccountFailure = (reason, unsupported = false) => ({
    type: ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE,
    error: reason,
    unsupported: unsupported
});

export const web3AccountUpdate = (update) => ({
    type: ACTIONS.WEB3_ACCOUNT_UPDATE,
    address: update['selectedAddress'],
    networkId: update['networkVersion']
});

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

export const testContract = (codeId, validation, addresses) => ({
    type: ACTIONS.TEST_CONTRACTS,
    codeId: codeId,
    validation: validation,
    addresses: addresses
});

export const testContractUpdate = (codeId, message) => ({
    type: ACTIONS.TEST_CONTRACTS_UPDATE,
    codeId: codeId,
    message: message
});

export const testContractSuccess = (codeId) => ({
    type: ACTIONS.TEST_CONTRACTS_SUCCESS,
    codeId: codeId
});

export const testContractFailure = (codeId, error) => ({
    type: ACTIONS.TEST_CONTRACT_FAILURE,
    codeId: codeId,
    error: error
});