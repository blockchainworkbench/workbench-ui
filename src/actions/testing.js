const ACTIONS = {
    SET_EXERCISE: "SET_EXERCISE",
    TEST_EXERCISE: "TEST_EXERCISE",
    TEST_EXERCISE_ERROR: "TEST_EXERCISE_ERROR",
    TEST_EXERCISE_UPDATE: "TEST_EXERCISE_UPDATE"
};

export const TESTING_ACTIONS = ACTIONS;

export const setTestExercise = (exercise, error) => ({
    type: ACTIONS.SET_EXERCISE,
    exercise: exercise,
    error: error
});

export const setTestExerciseError = (error) => ({
    type: ACTIONS.TEST_EXERCISE_ERROR,
    error: error
});

export const setTestExerciseUpdate = (message, type = null) => ({
    type: ACTIONS.TEST_EXERCISE_UPDATE,
    message: message,
    statusType: type
});

export const testExercise = (compilerVersion, userSolution, exerciseSolution, validation, optimize) => ({
    type: ACTIONS.TEST_EXERCISE,
    compilerVersion: compilerVersion,
    userSolution: userSolution,
    exerciseSolution: exerciseSolution,
    validation: validation,
    optimize: optimize
});
