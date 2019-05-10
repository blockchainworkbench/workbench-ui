import { PAGES_ACTIONS } from './pages'
import { EXERCISE_ACTIONS } from './exercise'
import { QUIZ_ACTIONS } from './quiz'
import { USER_ACTIONS } from './user'
import { WEB3_ACTIONS } from './web3'
import { SEARCH_ACTIONS } from './search'
import { TESTING_ACTIONS } from './testing'

export const ACTIONS = {
  ...EXERCISE_ACTIONS,
  ...QUIZ_ACTIONS,
  ...PAGES_ACTIONS,
  ...SEARCH_ACTIONS,
  ...USER_ACTIONS,
  ...WEB3_ACTIONS,
  ...TESTING_ACTIONS,
}
