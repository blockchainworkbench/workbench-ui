import {call, put, takeLatest} from 'redux-saga/effects';
import {checkWeb3AccountFailure, checkWeb3AccountSuccess, ACTIONS, web3AccountUpdate} from '../actions';
import Web3 from 'web3';
import store from '../store';

const web3Accounts = [
    takeLatest(ACTIONS.CHECK_WEB3_ACCOUNT, workerCheckAccount)
];

export default web3Accounts;

function onWeb3ConfigStoreUpdate(update) {
    store.dispatch(web3AccountUpdate(update));
}

function* workerCheckAccount() {
    try {
        let web3 = window.web3;
        let ethereum = window.ethereum;

        if (window.ethereum) {
            console.log('modern dapp browser');
            window.web3 = new Web3(ethereum);
            try {
                yield call(ethereum.enable);
                yield put(checkWeb3AccountSuccess());
                web3.currentProvider.publicConfigStore.on('update', update => onWeb3ConfigStoreUpdate(update));
            } catch (error) {
                yield put(checkWeb3AccountFailure("Access to Accounts denied by user."));
            }
        } else if (window.web3) {
            console.log('legacy dapp browser');
            window.web3 = new Web3(web3.currentProvider);
            yield put(checkWeb3AccountSuccess());
        } else {
            yield put(checkWeb3AccountFailure("Non-ethereum browser detected.", true));
        }
    } catch (error) {
        console.log('error in workerCheckAccount', error);
        yield put(checkWeb3AccountFailure(error));
    }
}