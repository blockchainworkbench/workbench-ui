import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
    checkWeb3AccountFailure,
    checkWeb3AccountSuccess,
    ACTIONS,
    web3AccountUpdate,
    deployFailure,
    deployUpdate, deploySuccess
} from '../actions';
import Web3 from 'web3';
import store from '../store';

const web3Accounts = [
    takeLatest(ACTIONS.CHECK_WEB3_ACCOUNT, workerCheckAccount),
    takeEvery(ACTIONS.DEPLOY_CONTRACTS, workerDeployContracts)
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

/**
 * Estimate the gas of a transaction with the given data
 * @param {string} data - Raw data passed to the transaction
 * @returns {Promise<int>} - Estimated gas
 */
function estimateGas(data) {
    return new Promise(resolve => {
        window.web3.eth.estimateGas({data: data}, (err, r) => {
            if (err) {
                console.log(err);
                return;
            }
            resolve(r);
        })
    })
}

/**
 * Estimate the current gas price
 * @returns {Promise<int>} - Estimated gas price
 */
function estimateGasPrice() {
    return new Promise(resolve => {
        window.web3.eth.getGasPrice((err, r) => {
            if (err) {
                console.log(err);
                return;
            }
            resolve(r);
        })
    })
}

function deploy(contract) {
    let web3 = window.web3;

    const abi = contract.interface;
    const bc = '0x' + contract.bytecode;
    const mcontract = web3.eth.contract(JSON.parse(abi));

    return new Promise(async (resolve, reject) => {

        if (!store.getState().appState.web3Account.validNetwork) return reject("You are in the wrong network");

        const estimate = await estimateGas(bc);
        const gasPrice = await estimateGasPrice();
        // TODO: ...[constructorParameter1, constructorParameter2]
        mcontract.new({data: bc, from: web3.eth.accounts[0], gas: estimate, gasPrice: gasPrice}, (err, r) => {
            if (err) {
                console.log(err);
                reject(new Error(err));
                return;
            }
            if (!r.address) return;
            resolve(r);
        })
    });
}

function* workerDeployContracts(action) {
    try {
        const addresses = [];
        let index = 0;

        // Deploy all contracts
        let errorMessage = false;
        for (let name of Object.keys(action.contracts)) {
            name = name.substring(1);
            const msg = `Deploying ${name}'\t${index++}/${Object.keys(action.contracts).length}`;
            yield put(deployUpdate(action.codeId, msg));
            try {
                const deployedCode = yield call(deploy, action.contracts[':' + name]);
                //window.dCode = deployedCode;
                addresses.push(deployedCode.address)
            } catch (error) {
                errorMessage = error;
                yield put(deployFailure(action.codeId, `Deployment error for contract ${name}: ${error}`));
            }
        }
        if (!errorMessage) {
            const msg = `Successfully deployed ${Object.keys(action.contracts).length} Contracts.`;
            yield put(deploySuccess(action.codeId, addresses, msg));
        }
    } catch (error) {
        console.log('error in workerDeployContracts', error);
        yield put(deployFailure(action.codeId, error));
    }
}