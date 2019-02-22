import {call, put, takeLatest} from 'redux-saga/effects';
import {ACTIONS, loadUserProfileFailure, loadUserProfileSuccess, logoutSuccess} from '../actions';
import {fetchUrl} from "../lib/helpers";

const userProfile = [
    takeLatest(ACTIONS.LOAD_USER_PROFILE, workerLoadProfile),
    takeLatest(ACTIONS.LOGOUT_USER, workerLogout)
];

export default userProfile;

function* workerLoadProfile() {
    try {
        const response = yield call(fetchUrl, '/api/users');
        yield put(loadUserProfileSuccess(response.data));
    } catch (error) {
        yield put(loadUserProfileFailure(error.response.data, error.response.status));
    }
}

function* workerLogout() {
    try {
        yield call(fetchUrl, '/api/auth/logout');
        yield put(logoutSuccess());
    } catch (error) {
        console.log('error on logout', error);
    }
}
