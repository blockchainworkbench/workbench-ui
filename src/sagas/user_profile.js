import {call, put, takeLatest} from 'redux-saga/effects';
import {ACTIONS} from '../actions';
import {fetchUrl, postUrl} from '../lib/helpers';
import {
    loadUserProfile,
    loadUserProfileFailure,
    loadUserProfileSuccess,
    logoutSuccess,
    saveProfileFailure,
    saveProfileSuccess
} from '../actions/user';

export default [
    takeLatest(ACTIONS.LOAD_USER_PROFILE, workerLoadProfile),
    takeLatest(ACTIONS.LOGOUT_USER, workerLogout),
    takeLatest(ACTIONS.SAVE_PROFILE, workerSaveProfile)
];

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

function* workerSaveProfile(action) {
    try {
        yield call(postUrl, '/api/users', {displayName: action.displayName, publicKey: action.publicKey});
        yield put(saveProfileSuccess());
        yield put(loadUserProfile());
    } catch (error) {
        yield put(saveProfileFailure(error.message));
    }
}
