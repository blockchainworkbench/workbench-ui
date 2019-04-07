const ACTIONS = {
  SET_EXERCISE: 'SET_EXERCISE',
  TEST_EXERCISE: 'TEST_EXERCISE',
  TEST_EXERCISE_ERROR: 'TEST_EXERCISE_ERROR',
  TEST_EXERCISE_UPDATE: 'TEST_EXERCISE_UPDATE',
  TEST_EXERCISE_COMPILE: 'TEST_EXERCISE_COMPILE',
  TEST_EXERCISE_COMPILE_SUCCESS: 'TEST_EXERCISE_COMPILE_SUCCESS',
  TEST_EXERCISE_COMPILE_FAILURE: 'TEST_EXERCISE_COMPILE_FAILURE',
  TEST_EXERCISE_DEPLOY: 'TEST_EXERCISE_DEPLOY',
  TEST_EXERCISE_DEPLOY_SUCCESS: 'TEST_EXERCISE_DEPLOY_SUCCESS',
  TEST_EXERCISE_DEPLOY_FAILURE: 'TEST_EXERCISE_DEPLOY_FAILURE',
}

export const TESTING_ACTIONS = ACTIONS

export const TEST_EXERCISE_CODE_ID = 'TEST_EXERCISE'

export const setTestExercise = (exercise, error) => ({
  type: ACTIONS.SET_EXERCISE,
  exercise: exercise,
  error: error,
})

export const setTestExerciseError = error => ({
  type: ACTIONS.TEST_EXERCISE_ERROR,
  error: error,
})

export const setTestExerciseUpdate = (message, type = null) => ({
  type: ACTIONS.TEST_EXERCISE_UPDATE,
  message: message,
  statusType: type,
})

export const testExercise = (compilerVersion, userSolution, exerciseSolution, validation, optimize) => ({
  type: ACTIONS.TEST_EXERCISE,
  compilerVersion: compilerVersion,
  userSolution: userSolution,
  exerciseSolution: exerciseSolution,
  validation: validation,
  optimize: optimize,
})

export const testExerciseCompile = (compiler, userSolution, exerciseSolution, validation, optimize) => ({
  type: ACTIONS.TEST_EXERCISE_COMPILE,
  compiler: compiler,
  userSolution: userSolution,
  exerciseSolution: exerciseSolution,
  validation: validation,
  optimize: optimize,
})

export const testExerciseCompileFailure = error => ({
  type: ACTIONS.TEST_EXERCISE_COMPILE_FAILURE,
  error: error,
})

export const testExerciseCompileSuccess = (code, validation, assert) => ({
  type: ACTIONS.TEST_EXERCISE_COMPILE_SUCCESS,
  code: code,
  validation: validation,
  assert: assert,
})

export const testExerciseDeploy = (exerciseCode, validationCode, assertLibrary) => ({
  type: ACTIONS.TEST_EXERCISE_DEPLOY,
  exercise: exerciseCode,
  validation: validationCode,
  assert: assertLibrary,
})

export const testExerciseDeploySuccess = (exerciseAddresses, validation) => ({
  type: ACTIONS.TEST_EXERCISE_DEPLOY_SUCCESS,
  exerciseAddresses: exerciseAddresses,
  validation: validation,
})

export const testExerciseDeployFailure = error => ({
  type: ACTIONS.TEST_EXERCISE_DEPLOY_FAILURE,
  error: error,
})
