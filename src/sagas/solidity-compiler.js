import {call, put, takeLatest} from 'redux-saga/effects';
import {ACTIONS} from '../actions';
import BrowserSolc from 'browser-solc';
import store from '../store';
import {
    compileFailure,
    COMPILER_STATE,
    compileSuccess,
    loadCompilerFailure,
    loadCompilerSuccess
} from '../actions/exercise';

export default [
    takeLatest(ACTIONS.LOAD_COMPILER, workerLoadCompiler),
    takeLatest(ACTIONS.COMPILE, workerCompile)
];

function* workerLoadCompiler(action) {
    try {
        const compiler = yield call(loadCompiler, action.version);
        yield put(loadCompilerSuccess(action.version, compiler));
    } catch (error) {
        console.log('error in solidityLoadCompiler-saga', action.version, error);
        yield put(loadCompilerFailure(action.version, error));
    }
}

function loadCompiler(version) {
    return new Promise(async (resolve, reject) => {
        const compiler = store.getState().appState.solidity.compiler.find(compiler => {
            return compiler.version === version
        });
        if (compiler === undefined || compiler.state !== COMPILER_STATE.LOADED) {
            console.log('loading compiler', version);
            if (BrowserSolc) {
                const browserSolc = window.BrowserSolc;
                browserSolc.loadVersion(version, compiler => {
                    resolve(compiler);
                });
            } else reject("browser-solc not loaded");
        } else resolve(compiler.compiler);
    });
}

function* workerCompile(action) {
    try {
        const compiledCode = yield call(compile, action.compiler, action.userSolution,
            action.exerciseSolution, action.optimize);
        yield put(compileSuccess(action.codeId, compiledCode));
    } catch (error) {
        console.log('Compile Error', error.message || error);
        yield put(compileFailure(action.codeId, error.message || error));
    }
}

/**
 * Replace all `msg.sender` instance by the user address
 * @param {string} str - code to modify
 * @returns {string} - code without msg.sender
 * @dev this step is necessary for some tests because the sender is the test contract
 */
function replaceMsgSender(str) {
    const web3 = window.web3;
    return str.replace(/msg\.sender/g, web3.toChecksumAddress(web3.eth.accounts[0]))
}

function compile(compiler, userSolution, exerciseSolution, optimize) {
    return new Promise(async (resolve, reject) => {
        try {
            userSolution = replaceMsgSender(userSolution);
            const rCode = compiler.compile(userSolution, optimize);
            const rCodeSolution = compiler.compile(exerciseSolution, optimize);

            // If code does not compile properly
            if (rCode.errors) {
                reject(new Error(rCode.errors[0]));
            } else {
                const notDefined =
                    Object.keys(rCodeSolution.contracts)
                        .filter(name => {
                            return rCode.contracts[name] === undefined
                        }).map(name => {
                        return name.substring(1)
                    });

                if (notDefined.length > 0) {
                    let msg = '';
                    if (notDefined.length === 1) {
                        msg = `Contract ${notDefined[0]} is not defined`;
                    } else {
                        msg = `Contracts [${notDefined.join(', ')}] are not defined`;
                    }
                    reject(msg);
                }
            }
            resolve(rCode);
        } catch (err) {
            reject(err.message || err);
        }
    });
}
