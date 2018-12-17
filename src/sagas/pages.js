import {call, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {loadPagesError, loadPagesSuccess} from '../actions';

const pageSagas = [
    takeLatest("LOAD_PAGES", workerFetchPageList)
];

export default pageSagas;

function fetchPageList() {
    return axios({
        method: "get", url: "https://blockchainworkbench.github.io/jsonfeed/"
    });
}

function* workerFetchPageList() {
    try {
        const response = yield call(fetchPageList);
        const pages = response.data.pages;
        yield put(loadPagesSuccess(pages));
    } catch (error) {
        console.log('error loading pages', error);
        yield put(loadPagesError(error));
    }
}