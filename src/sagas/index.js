import {all} from 'redux-saga/effects';

import pages from './pages';
import pagesSorted from './pages-sorted';
import web3Accounts from './web3-accounts';
import solidityCompiler from './solidity-compiler';
import exercises from './exercises';
import userProfile from './user_profile';
import testing from './testing';

export default function* rootSaga() {
    yield all([
        ...pages,
        ...pagesSorted,
        ...web3Accounts,
        ...solidityCompiler,
        ...exercises,
        ...userProfile,
        ...testing
    ]);
};
