import { call, put, take, takeEvery } from 'redux-saga/effects'
import { ACTIONS } from '../actions'
import { checkWeb3Account } from '../actions/web3'
import {
  compile,
  deploy,
  EXERCISE_STATE,
  loadCompiler,
  setExerciseError,
  setExerciseUpdate,
  testContracts,
} from '../actions/exercise'
import { postUrl } from '../lib/helpers'
import {
  compilerLoaded,
  exerciseCompiledFailure,
  exerciseCompiledSuccess,
  exerciseDeployedAction,
  exerciseDeployedFailure,
  exerciseTestFailure,
  exerciseTestSuccess,
} from '../lib/saga-action-filter'

export default [takeEvery(ACTIONS.RUN_EXERCISE, workerExecuteExercise)]

function* workerExecuteExercise(action) {
  try {
    yield put(setExerciseUpdate(action.codeId, 'Loading compiler'))
    yield put(loadCompiler(action.compilerVersion))
    const compilerAction = yield take(target => compilerLoaded(action.compilerVersion, target))

    yield put(setExerciseUpdate(action.codeId, 'Checking wallet access', EXERCISE_STATE.AUTHORIZING))
    yield put(checkWeb3Account())
    const web3Account = yield take([ACTIONS.CHECK_WEB3_ACCOUNT_SUCCESS, ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE])
    if (web3Account.type === ACTIONS.CHECK_WEB3_ACCOUNT_FAILURE) {
      console.log(web3Account.error)
      return yield put(setExerciseError(action.codeId, web3Account.error))
    }

    yield put(
      compile(action.codeId, compilerAction.compiler, action.userSolution, action.exerciseSolution, action.optimize),
    )
    const compilationResultAction = yield take([
      target => exerciseCompiledSuccess(action.codeId, target),
      target => exerciseCompiledFailure(action.codeId, target),
    ])
    if (compilationResultAction.type === ACTIONS.COMPILE_FAILURE) {
      return console.log('Compilation failed. Cancel exercise now.')
    }

    yield put(deploy(action.codeId, compilationResultAction.code.contracts))
    const deploymentResultAction = yield take([
      target => exerciseDeployedAction(action.codeId, target),
      target => exerciseDeployedFailure(action.codeId, target),
    ])
    if (deploymentResultAction.type === ACTIONS.DEPLOY_CONTRACTS_FAILURE) {
      return console.log('Deployment failed. Cancel exercise now.')
    }

    yield put(testContracts(action.codeId, action.validation, deploymentResultAction.addresses))
    const testResultAction = yield take([
      target => exerciseTestSuccess(action.codeId, target),
      target => exerciseTestFailure(action.codeId, target),
    ])
    if (testResultAction.type === ACTIONS.TEST_CONTRACT_FAILURE) {
      return console.log('Tests of exercise failed.')
    }

    yield call(postExerciseResult, action.codeId)
  } catch (error) {
    console.log('Error in workerExecuteExercise', action.codeId, error)
    yield put(setExerciseError(action.codeId, error.message || error))
  }
}

async function postExerciseResult(exerciseId) {
  try {
    const url = `/api/exercises/${exerciseId}`
    await postUrl(url, {})
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('You are not logged in. Your exercise success is not stored in your profile.')
      console.log('If you want to have full history of your progress, log in and submit the exercise again.')
      return
    }
    throw new Error(`Failed to save user progress: ${error.response.data}`)
  }
}
