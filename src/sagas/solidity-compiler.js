import {call, put, takeLatest} from 'redux-saga/effects';
import {
    ACTIONS,
    compileFailure,
    COMPILER_STATE,
    compileSuccess,
    loadCompilerFailure,
    loadCompilerSuccess
} from '../actions';
import BrowserSolc from 'browser-solc';
import store from '../store';

const solidityCompiler = [
    takeLatest(ACTIONS.LOAD_COMPILER, workerLoadCompiler),
    takeLatest(ACTIONS.COMPILE, workerCompile)
];

export default solidityCompiler;

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
                    console.log('compiler loaded');
                    resolve(compiler);
                });
            } else {
                reject("browser-solc not loaded");
            }
        } else {
            console.log('compiler already loaded. using cached version.');
            resolve(compiler);
        }
    });
}

function* workerCompile(action) {
    try {
        const compiledCode = yield call(compile, action.compiler, action.userSolution,
            action.exerciseSolution, action.optimize);
        yield put(compileSuccess(action.codeId, compiledCode));
    } catch (error) {
        console.log('error in workerCompile', error);
        yield put(compileFailure(action.codeId, error));
    }
}

function compile(compiler, userSolution, exerciseSolution, optimize) {
    return new Promise(async (resolve, reject) => {
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
                const msg = `Contracts [${notDefined.join(', ')}] are not defined`;
                console.log(msg);
                reject(new Error(msg));
            }
        }
        resolve(rCode);
    });
}