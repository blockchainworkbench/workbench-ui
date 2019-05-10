import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ACTIONS } from '../actions'
import { fetchUrl } from '../lib/helpers'
import {
  checkPageStatusSuccess,
  loadPageContentFailure,
  loadPageContentSuccess,
  loadPagesFailure,
  loadPagesSuccess,
} from '../actions/pages'
import { DIFFICULTY } from '../actions/search'

const BASE_URL = process.env.REACT_APP_JSONFEED_BASE

export default [
  takeLatest(ACTIONS.LOAD_PAGES, workerFetchPageList),
  takeEvery(ACTIONS.LOAD_PAGE_CONTENT, workerFetchPageContent),
  takeEvery(ACTIONS.CHECK_PAGE_STATUS, workerCheckPageStatus),
]

function* workerFetchPageList() {
  try {
    const response = yield call(fetchUrl, BASE_URL)
    const pages = response.data.pages
    for (const page of pages) {
      if (
        page.difficulty !== DIFFICULTY.EASY &&
        page.difficulty !== DIFFICULTY.MEDIUM &&
        page.difficulty !== DIFFICULTY.HARD
      ) {
        page.difficulty = null
      }
    }
    yield put(loadPagesSuccess(pages))
  } catch (error) {
    console.log('error loading pages', error)
    yield put(loadPagesFailure(error))
  }
}

function* workerFetchPageContent(action) {
  try {
    const apiUrl = BASE_URL + action.pageUrl
    const response = yield call(fetchUrl, apiUrl)
    if (response.data.url !== action.pageUrl) {
      yield put(loadPageContentFailure('Could not load page content.', { url: action.pageUrl }))
    } else {
      yield put(loadPageContentSuccess(response.data))
    }
  } catch (error) {
    console.log('error loading page content', error)
    yield put(loadPageContentFailure(error))
  }
}

function* workerCheckPageStatus(action) {
  try {
    const apiUrl = `/api/${action.url}`
    const response = yield call(fetchUrl, apiUrl)
    yield put(checkPageStatusSuccess(action.url, response.data))
  } catch (error) {
    console.log('error checkpagestatus', error)
  }
}
