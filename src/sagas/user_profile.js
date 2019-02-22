import {call, put, takeLatest} from 'redux-saga/effects';
import {
    ACTIONS, loadUserProfile,
    loadUserProfileFailure,
    loadUserProfileSuccess,
    logoutSuccess,
    saveProfileFailure,
    saveProfileSuccess
} from '../actions';
import {fetchUrl, postUrl} from "../lib/helpers";

const userProfile = [
    takeLatest(ACTIONS.LOAD_USER_PROFILE, workerLoadProfile),
    takeLatest(ACTIONS.LOGOUT_USER, workerLogout),
    takeLatest(ACTIONS.SAVE_PROFILE, workerSaveProfile)
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

function* workerSaveProfile(action) {
    try {
        console.log('profile save start');
        yield call(postUrl, '/api/users', {displayName: action.displayName, publicKey: action.publicKey});
        console.log('callback');
        yield put(saveProfileSuccess());
        console.log('loading new profile now');
        yield put(loadUserProfile());
    } catch (error) {
        yield put(saveProfileFailure(error.message));
    }
}
