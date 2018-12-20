import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
    loadPagesFailure,
    loadPagesSuccess,
    loadPageContentFailure,
    loadPageContentSuccess,
    DIFFICULTY, ACTIONS
} from '../actions';

const BASE_URL = process.env.REACT_APP_JSONFEED_BASE;

const pageSagas = [
    takeLatest(ACTIONS.LOAD_PAGES, workerFetchPageList),
    takeLatest(ACTIONS.LOAD_PAGE_CONTENT, workerFetchPageContent)
];

export default pageSagas;

function fetchUrl(url) {
    return axios({
        method: "get", url: url
    });
}

function* workerFetchPageList() {
    try {
        const response = yield call(fetchUrl, BASE_URL + "index.html");
        const pages = response.data.pages;
        for (const page of pages) {
            if (page.difficulty !== DIFFICULTY.EASY
                && page.difficulty !== DIFFICULTY.MEDIUM
                && page.difficulty !== DIFFICULTY.HARD) {
                page.difficulty = null;
            }
        }
        yield put(loadPagesSuccess(pages));
    } catch (error) {
        console.log('error loading pages', error);
        yield put(loadPagesFailure(error));
    }
}

function* workerFetchPageContent(action) {
    try {
        const response = yield call(fetchUrl, BASE_URL + action.pageUrl);
        yield put(loadPageContentSuccess(response.data));
    } catch (error) {
        console.log('error loading page content', error);
        yield put(loadPageContentFailure(error));
    }
}
