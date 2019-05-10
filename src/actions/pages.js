const ACTIONS = {
  LOAD_PAGES: 'LOAD_PAGES',
  LOAD_PAGES_SUCCESS: 'LOAD_PAGES_SUCCESS',
  LOAD_PAGES_FAILURE: 'LOAD_PAGES_FAILURE',
  LOAD_PAGES_SUCCESS_SORTED: 'LOAD_PAGES_SORTED',
  LOAD_PAGE_CONTENT: 'LOAD_PAGE_CONTENT',
  LOAD_PAGE_CONTENT_SUCCESS: 'LOAD_PAGE_CONTENT_SUCCESS',
  LOAD_PAGE_CONTENT_FAILURE: 'LOAD_PAGE_CONTENT_FAILURE',
  CHECK_PAGE_STATUS: 'CHECK_PAGE_STATUS',
  CHECK_PAGE_STATUS_SUCCESS: 'CHECK_PAGE_STATUS_SUCCESS',
}

export const PAGES_ACTIONS = ACTIONS

export const loadPagesSuccess = pages => ({
  type: ACTIONS.LOAD_PAGES_SUCCESS,
  pages: pages,
})

export const loadPagesFailure = error => ({
  type: ACTIONS.LOAD_PAGES_FAILURE,
  error: error,
})

export const loadPages = () => ({
  type: ACTIONS.LOAD_PAGES,
})

export const loadPagesSuccessSorted = categories => ({
  type: ACTIONS.LOAD_PAGES_SUCCESS_SORTED,
  categories: categories,
})

export const loadPageContent = pageUrl => ({
  type: ACTIONS.LOAD_PAGE_CONTENT,
  pageUrl: pageUrl,
})

export const loadPageContentSuccess = page => ({
  type: ACTIONS.LOAD_PAGE_CONTENT_SUCCESS,
  page: page,
})

export const loadPageContentFailure = (error, page) => ({
  type: ACTIONS.LOAD_PAGE_CONTENT_FAILURE,
  error: error,
  page: page,
})

export const checkPageStatus = pageUrl => ({
  type: ACTIONS.CHECK_PAGE_STATUS,
  url: pageUrl,
})

export const checkPageStatusSuccess = (pageUrl, completed) => ({
  type: ACTIONS.CHECK_PAGE_STATUS_SUCCESS,
  url: pageUrl,
  completed: completed,
})
