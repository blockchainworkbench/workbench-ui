import {call, put, takeLatest} from 'redux-saga/effects';
import {ACTIONS} from '../actions';
import BrowserSolc from 'browser-solc';
import store from '../store';
import _ from 'lodash';

import {
    compileFailure,
    COMPILER_STATE,
    compileSuccess,
    loadCompilerFailure,
    loadCompilerSuccess
} from '../actions/exercise';
import {testExerciseCompileFailure, testExerciseCompileSuccess} from "../actions/testing";
import {fetchUrl} from "../lib/helpers";
import {createInterfaces, transformSolidityTest} from "../lib/builder";

export default [
    takeLatest(ACTIONS.LOAD_COMPILER, workerLoadCompiler),
    takeLatest(ACTIONS.COMPILE, workerCompile),
    takeLatest(ACTIONS.TEST_EXERCISE_COMPILE, workerCompileTestExercise)
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

function* workerCompileTestExercise(action) {
    try {
        const compiled = yield call(compileTestExercise, action.compiler, action.userSolution,
            action.exerciseSolution, action.validation, action.optimize);
        yield put(testExerciseCompileSuccess(compiled.code, compiled.validation, compiled.assert));
    } catch (error) {
        console.log('testEx compile error', error.message || error);
        yield put(testExerciseCompileFailure(error.message || error));
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

function compileTestExercise(compiler, userSolution, exerciseSolution, validation, optimize) {
    return new Promise(async (resolve, reject) => {
        try {
            userSolution = replaceMsgSender(userSolution);
            const compiledUserSolution = compiler.compile(userSolution, optimize);
            const compiledExerciseSolution = compiler.compile(exerciseSolution, optimize);
            const assertLibraryUrl = require('../lib/Assert.sol');
            const assertLibraryResponse = await fetchUrl(assertLibraryUrl);
            const assertLibrary = assertLibraryResponse.data;
            // const assertLibraryInput = {'Assert.sol': assertLibrary};
            // const codes = compiler.compile(assertLibraryInput, 1);
            // Create an interface for every contract the user will code

            if (compiledUserSolution.errors) {
                return reject(new Error("User Solution: " + compiledUserSolution.errors[0]));
            }

            if (compiledExerciseSolution.errors) {
                return reject(new Error("Exercise Solution: " + compiledExerciseSolution.errors[0]));
            }

            const notDefined =
                Object.keys(compiledExerciseSolution.contracts)
                    .filter(name => {
                        return compiledUserSolution.contracts[name] === undefined
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
                return reject(msg);
            }

            // compile assert library
            const compiledAssertLib = compiler.compile({sources: {'Assert.sol': assertLibrary}}, optimize);
            if (compiledAssertLib.errors) {
                return reject(new Error("AssertLib: " + compiledAssertLib.errors[0]));
            }

            const interfaces = createInterfaces(compiledExerciseSolution);
            const names = interfaces.map(snip => snip.name);
            // Make test available for any user-specified contract
            const validationTransformed = transformSolidityTest(validation, names);

            // Compile interfaces, assert library and test code
            const input = interfaces.reduce(function (acc, inter) {
                const m = {};
                m[inter.name + '.sol'] = inter.code;
                return _.extend(acc, m)
            }, {});

            input['Assert.sol'] = assertLibrary;
            input['test.sol'] = validationTransformed;
            const compiledValidation = compiler.compile({sources: input}, optimize);

            if (compiledValidation.errors) {
                return reject(new Error("Validation: " + compiledValidation.errors[0]));
            }

            console.log('temp: Compilation of Test Exercise ok');
            resolve({code: compiledUserSolution, validation: compiledValidation, assert: compiledAssertLib});
        } catch (err) {
            reject(err.message || err);
        }
    });
}
