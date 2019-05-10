const ACTIONS = {
  CHECK_QUIZ_STATUS: 'CHECK_QUIZ_STATUS',
  CHECK_QUIZ_STATUS_SUCCESS: 'CHECK_QUIZ_STATUS_SUCCESS',
  MARK_QUIZ_SOLVED: 'MARK_QUIZ_SOLVED',
}

export const QUIZ_ACTIONS = ACTIONS

export const checkQuizStatus = quizId => ({
  type: ACTIONS.CHECK_QUIZ_STATUS,
  quizId: quizId,
})

export const checkQuizStatusSuccess = (quizId, completed) => ({
  type: ACTIONS.CHECK_QUIZ_STATUS_SUCCESS,
  quizId: quizId,
  completed: completed,
})

export const markQuizSolved = quizId => ({
  type: ACTIONS.MARK_QUIZ_SOLVED,
  quizId: quizId,
})
