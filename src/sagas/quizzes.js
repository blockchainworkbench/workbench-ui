import { fetchUrl, postUrl } from '../lib/helpers'
import { ACTIONS } from '../actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { checkQuizStatusSuccess } from '../actions/quiz'

export default [
  takeEvery(ACTIONS.CHECK_QUIZ_STATUS, workerCheckQuizStatus),
  takeEvery(ACTIONS.MARK_QUIZ_SOLVED, workerMarkQuizSolved),
]

function* workerCheckQuizStatus(action) {
  try {
    const response = yield call(fetchUrl, `/api/quizzes/${action.quizId}/completed`)
    yield put(checkQuizStatusSuccess(action.quizId, response.data))
  } catch (error) {
    console.log('checkQuizStatus', error)
  }
}

function* workerMarkQuizSolved(action) {
  try {
    yield call(postUrl, `/api/quizzes/${action.quizId}`)
  } catch (error) {
    console.log('markQuizSolved', error)
  }
}
