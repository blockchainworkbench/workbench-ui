import {put, take, takeEvery} from 'redux-saga/effects';
import {
    ACTIONS,
    checkWeb3Account,
    compile,
    deploy, EXERCISE_STATE,
    loadCompiler,
    setExerciseError,
    setExerciseUpdate,
    testContracts
} from '../actions';

const exercises = [
    takeEvery(ACTIONS.RUN_EXERCISE, workerExecuteExercise)
];

export default exercises;

const exerciseDeployedAction = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.DEPLOY_CONTRACTS_SUCCESS;
const exerciseDeployedFailure = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.DEPLOY_CONTRACTS_FAILURE;
const exerciseCompiledSuccess = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.COMPILE_SUCCESS;
const exerciseCompiledFailure = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.COMPILE_FAILURE;
const exerciseTestSuccess = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.TEST_CONTRACTS_SUCCESS;
const exerciseTestFailure = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.TEST_CONTRACT_FAILURE;
const compilerLoaded = (compilerVersion, target) =>
    target.version === compilerVersion && target.type === ACTIONS.LOAD_COMPILER_SUCCESS;

function* workerExecuteExercise(action) {
    try {
        yield put(setExerciseUpdate(action.codeId, "Loading compiler"));
        yield put(loadCompiler(action.compilerVersion));
        const compilerAction = yield take(target => compilerLoaded(action.compilerVersion, target));
        console.log('Compiler loaded.');

        yield put(compile(action.codeId, compilerAction.compiler, action.userSolution, action.exerciseSolution, action.optimize));
        const compilationResultAction = yield take([
            target => exerciseCompiledSuccess(action.codeId, target),
            target => exerciseCompiledFailure(action.codeId, target)
        ]);
        if (compilationResultAction.type === ACTIONS.COMPILE_FAILURE) {
            return console.log("Compilation failed. Cancel exercise now.");
        }
        console.log('Exercise compiled');

        yield put(setExerciseUpdate(action.codeId, "Checking wallet access", EXERCISE_STATE.AUTHORIZING));
        yield put(checkWeb3Account());
        const web3Account = yield take([
            ACTIONS.CHECK_WEB3_ACCOUNT_SUCCESS,
            ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE
        ]);
        if (web3Account.type === ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE) {
            return yield put(setExerciseError(action.codeId, web3Account.error));
        }

        yield put(deploy(action.codeId, compilationResultAction.code.contracts));
        const deploymentResultAction = yield take([
            target => exerciseDeployedAction(action.codeId, target),
            target => exerciseDeployedFailure(action.codeId, target)
        ]);
        if (deploymentResultAction.type === ACTIONS.DEPLOY_CONTRACTS_FAILURE) {
            return console.log("Deployment failed. Cancel exercise now.");
        }
        console.log("Exercise deployed");

        yield put(testContracts(action.codeId, action.validation, deploymentResultAction.addresses));
        const testResultAction = yield take([
            target => exerciseTestSuccess(action.codeId, target),
            target => exerciseTestFailure(action.codeId, target)
        ]);
        if (testResultAction.type === ACTIONS.TEST_CONTRACT_FAILURE) {
            return console.log("Tests of exercise failed.");
        }
        console.log("Exercise completed");

    } catch (error) {
        console.log('Error in workerExecuteExercise', action.codeId, error);
        yield put(setExerciseError(action.codeId, error));
    }
}
