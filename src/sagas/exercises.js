import {put, take, takeEvery} from 'redux-saga/effects';
import {ACTIONS, compile, deploy, loadCompiler, setExerciseError, testContracts} from '../actions';

const exercises = [
    takeEvery(ACTIONS.RUN_EXERCISE, workerExecuteExercise)
];

export default exercises;


const exerciseDeployedAction = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.DEPLOY_CONTRACTS_SUCCESS;
const exerciseCompiledSuccess = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.COMPILE_SUCCESS;
const exerciseTestSuccess = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.TEST_CONTRACTS_SUCCESS;
const compilerLoaded = (compilerVersion, target) =>
    target.version === compilerVersion && target.type === ACTIONS.LOAD_COMPILER_SUCCESS;
const compilerLoadError = (compilerVersion, target) =>
    target.version === compilerVersion && target.type === ACTIONS.LOAD_COMPILER_FAILURE;


function* workerExecuteExercise(action) {
    try {
        yield put(loadCompiler(action.compilerVersion));
        const compilerAction = yield take(target => compilerLoaded(action.compilerVersion, target));

        console.log(compilerAction);

        yield put(compile(action.codeId, compilerAction.compiler.compiler, action.userSolution, action.exerciseSolution, action.optimize));
        const exercise_compiled = yield take(target => exerciseCompiledSuccess(action.codeId, target));
        console.log('exercise compiled');

        yield put(deploy(action.codeId, exercise_compiled.code.contracts));
        const exercise_deployed = yield take([target => exerciseDeployedAction(action.codeId, target)]);
        console.log("Exercise deployed");

        yield put(testContracts(action.codeId, action.validation, exercise_deployed.addresses));
        yield take([target => exerciseTestSuccess(action.codeId, target)]);
        console.log("Exercise completed");

    } catch (error) {
        console.log('error in workerExecuteExercise', action.codeId, error);
        yield put(setExerciseError(action.codeId, error));
    }
}
