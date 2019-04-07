import { put, take, takeLatest } from 'redux-saga/effects'
import { ACTIONS } from '../actions'
import { EXERCISE_STATE, loadCompiler, testContracts } from '../actions/exercise'
import { compilerLoaded, exerciseTestFailure, exerciseTestSuccess } from '../lib/saga-action-filter'
import { checkWeb3Account } from '../actions/web3'
import {
  setTestExerciseError,
  setTestExerciseUpdate,
  TEST_EXERCISE_CODE_ID,
  testExerciseCompile,
  testExerciseDeploy,
} from '../actions/testing'

export default [takeLatest(ACTIONS.TEST_EXERCISE, workerTestExercise)]

function* workerTestExercise(action) {
  try {
    yield put(setTestExerciseUpdate('Loading compiler'))
    yield put(loadCompiler(action.compilerVersion))
    const compilerAction = yield take(target => compilerLoaded(action.compilerVersion, target))

    yield put(setTestExerciseUpdate('Checking wallet access', EXERCISE_STATE.AUTHORIZING))
    yield put(checkWeb3Account())
    const web3Account = yield take([ACTIONS.CHECK_WEB3_ACCOUNT_SUCCESS, ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE])
    if (web3Account.type === ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE) {
      console.log(web3Account.error)
      return yield put(setTestExerciseError(web3Account.error))
    }

    yield put(
      testExerciseCompile(
        compilerAction.compiler,
        action.userSolution,
        action.exerciseSolution,
        action.validation,
        action.optimize,
      ),
    )
    const compilationResultAction = yield take([
      ACTIONS.TEST_EXERCISE_COMPILE_SUCCESS,
      ACTIONS.TEST_EXERCISE_COMPILE_FAILURE,
    ])
    if (compilationResultAction.type === ACTIONS.TEST_EXERCISE_COMPILE_FAILURE) {
      return yield put(setTestExerciseError(compilationResultAction.error))
    }

    yield put(
      testExerciseDeploy(
        compilationResultAction.code.contracts,
        compilationResultAction.validation.contracts,
        compilationResultAction.assert.contracts,
      ),
    )

    const deploymentResultAction = yield take([
      ACTIONS.TEST_EXERCISE_DEPLOY_SUCCESS,
      ACTIONS.TEST_EXERCISE_DEPLOY_FAILURE,
    ])
    if (deploymentResultAction.type === ACTIONS.TEST_EXERCISE_DEPLOY_FAILURE) {
      return console.log('Deployment failed. Cancel test exercise now.')
    }

    yield put(
      testContracts(TEST_EXERCISE_CODE_ID, deploymentResultAction.validation, deploymentResultAction.exerciseAddresses),
    )
    const testResultAction = yield take([
      target => exerciseTestSuccess(TEST_EXERCISE_CODE_ID, target),
      target => exerciseTestFailure(TEST_EXERCISE_CODE_ID, target),
    ])
    if (testResultAction.type === ACTIONS.TEST_CONTRACT_FAILURE) {
      return console.log('Tests of exercise failed.')
    }
  } catch (e) {
    console.log('workerTestExercise', e)
  }
}
