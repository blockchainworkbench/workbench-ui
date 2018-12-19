import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {loadPagesError, loadPagesSuccess, loadPageError, loadPageSuccess, DIFFICULTY} from '../actions';

const BASE_URL = process.env.REACT_APP_JSONFEED_BASE;

const pageSagas = [
    takeLatest("LOAD_PAGES", workerFetchPageList),
    takeLatest("LOAD_PAGE", workerFetchPage)
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
        yield put(loadPagesError(error));
    }
}

function* workerFetchPage(action) {
    try {
        const response = yield call(fetchUrl, BASE_URL + action.pageUrl);
        const page = response.data;
        yield put(loadPageSuccess(page));
    } catch (error) {
        yield put(loadPageError(error));
    }
}
