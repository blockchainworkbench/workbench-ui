import {all} from "redux-saga/effects";

import pages from './pages';
import pagesSorted from './pages-sorted';

export default function* rootSaga() {
    yield all([
        ...pages,
        ...pagesSorted
    ]);
};