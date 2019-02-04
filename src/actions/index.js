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