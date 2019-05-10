import { combineReducers } from 'redux'

import { ACTIONS } from '../actions'

const exercises = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.LOAD_USER_PROFILE_SUCCESS:
      return [...new Set([...state, ...action.exercises.map(ex => ex.id)])]
    case ACTIONS.CHECK_EXERCISE_STATUS_SUCCESS:
      if (action.completed) {
        return [...new Set([...state, action.exerciseId])]
      }
      return [...state]
    default:
      return state
  }
}

const quizzes = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.LOAD_USER_PROFILE_SUCCESS:
      return [...new Set([...state, ...action.quizzes.map(q => q.id)])]
    case ACTIONS.CHECK_QUIZ_STATUS_SUCCESS:
      if (action.completed) {
        return [...new Set([...state, action.quizId])]
      }
      return [...state]
    case ACTIONS.MARK_QUIZ_SOLVED:
      return [...new Set([...state, action.quizId])]
    default:
      return state
  }
}

const pages = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.CHECK_PAGE_STATUS_SUCCESS:
      if (action.completed) {
        return [...new Set([...state, action.url])]
      }
      return [...state]
    default:
      return state
  }
}

export default combineReducers({ exercises, quizzes, pages })
