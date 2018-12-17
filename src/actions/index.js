export const ACTIONS = {
    UPDATE_DIFFICULTY_FILTER: "UPDATE_DIFFICULTY_FILTER",
    ADD_CATEGORY_FILTER: "ADD_CATEGORY_FILTER",
    REMOVE_CATEGORY_FILTER: "REMOVE_CATEGORY_FILTER",
    CHANGE_CATEGORY_FILTER_TYPE: "CHANGE_CATEGORY_FILTER_TYPE",
    SELECT_PAGE: "SELECT_PAGE",
    PAGES_LOAD_SUCCCESS: "PAGES_LOAD_SUCCCESS",
    PAGES_LOAD_ERROR: "PAGES_LOAD_ERROR",
    LOAD_PAGES: "LOAD_PAGES"
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
    type: ACTIONS.PAGES_LOAD_SUCCCESS,
    pages: pages
});

export const loadPagesError = error => ({
    type: ACTIONS.PAGES_LOAD_ERROR,
    error: error
});

export const loadPages = () => ({
    type: ACTIONS.LOAD_PAGES
});