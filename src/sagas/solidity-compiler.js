import { call, put, takeLatest } from 'redux-saga/effects'
import { ACTIONS } from '../actions'
import BrowserSolc from 'browser-solc'
import store from '../store'
import _ from 'lodash'
import {
  compileFailure,
  COMPILER_STATE,
  compileSuccess,
  loadCompilerFailure,
  loadCompilerSuccess,
} from '../actions/exercise'
import { testExerciseCompileFailure, testExerciseCompileSuccess } from '../actions/testing'
import { fetchUrl } from '../lib/helpers'
import { createInterfaces, transformSolidityTest } from '../lib/builder'

let ASSERT_LIBRARY_CONTENT = false

export default [
  takeLatest(ACTIONS.LOAD_COMPILER, workerLoadCompiler),
  takeLatest(ACTIONS.COMPILE, workerCompile),
  takeLatest(ACTIONS.TEST_EXERCISE_COMPILE, workerCompileTestExercise),
]

function* workerLoadCompiler(action) {
  try {
    const compiler = yield call(loadCompiler, action.version)
    yield put(loadCompilerSuccess(action.version, compiler))
  } catch (error) {
    console.log('error in solidityLoadCompiler-saga', action.version, error)
    yield put(loadCompilerFailure(action.version, error))
  }
}

function loadCompiler(version) {
  return new Promise(async (resolve, reject) => {
    const compiler = store.getState().appState.solidity.compiler.find(compiler => {
      return compiler.version === version
    })
    if (compiler === undefined || compiler.state !== COMPILER_STATE.LOADED) {
      console.log('loading compiler', version)
      if (BrowserSolc) {
        const browserSolc = window.BrowserSolc
        browserSolc.loadVersion(version, compiler => {
          resolve(compiler)
        })
      } else reject('browser-solc not loaded')
    } else resolve(compiler.compiler)
  })
}

function* workerCompile(action) {
  try {
    const compiler = action.compiler
    const optimize = action.optimize
    const userSolutionCompiled = yield call(compileExerciseBlock, compiler, action.userSolution, optimize)
    const exerciseSolutionCompiled = yield call(compileExerciseBlock, compiler, action.exerciseSolution, optimize)
    yield call(checkIfContractsExist, userSolutionCompiled, exerciseSolutionCompiled)
    yield put(compileSuccess(action.codeId, userSolutionCompiled))
  } catch (error) {
    console.log('Compile Error', error.message || error)
    yield put(compileFailure(action.codeId, error.message || error))
  }
}

function* workerCompileTestExercise(action) {
  try {
    const userSolution = replaceMsgSender(action.userSolution)
    const compiler = action.compiler
    const optimize = action.optimize

    const userSolutionCompiled = yield call(compileExerciseBlock, compiler, userSolution, optimize, 'User Solution')

    const exerciseSolutionCompiled = yield call(
      compileExerciseBlock,
      compiler,
      action.exerciseSolution,
      optimize,
      'Exercise Solution',
    )

    yield call(checkIfContractsExist, userSolutionCompiled, exerciseSolutionCompiled)

    const assertLibraryCompiled = yield call(compileAssertLibrary, compiler, optimize)

    const interfaces = createInterfaces(exerciseSolutionCompiled)
    const validationCompiled = yield call(compileTestExercise, compiler, action.validation, interfaces, optimize)

    yield put(testExerciseCompileSuccess(userSolutionCompiled, validationCompiled, assertLibraryCompiled))
  } catch (error) {
    console.log(error.message || error)
    yield put(testExerciseCompileFailure(error.message || error))
  }
}

/**
 * Replace all `msg.sender` instance by the user address
 * @param {string} str - code to modify
 * @returns {string} - code without msg.sender
 * @dev this step is necessary for some tests because the sender is the test contract
 */
function replaceMsgSender(str) {
  const web3 = window.web3
  return str.replace(/msg\.sender/g, web3.toChecksumAddress(web3.eth.accounts[0]))
}

function compileExerciseBlock(compiler, code, optimize, codeName) {
  return new Promise(async (resolve, reject) => {
    try {
      const compileResult = compiler.compile(code, optimize)
      if (compileResult.errors) {
        if (codeName) {
          return reject(new Error(`${codeName}: ${compileResult.errors[0]}`))
        }
        return reject(new Error(compileResult.errors[0]))
      }
      resolve(compileResult)
    } catch (e) {
      reject(e.message || e)
    }
  })
}

function checkIfContractsExist(userSolution, exerciseSolution) {
  return new Promise((resolve, reject) => {
    const notDefined = Object.keys(exerciseSolution.contracts)
      .filter(name => userSolution.contracts[name] === undefined)
      .map(name => name.substring(1))
    if (notDefined.length > 0) {
      let msg = ''
      if (notDefined.length === 1) {
        msg = `Contract ${notDefined[0]} is not defined`
      } else {
        msg = `Contracts [${notDefined.join(', ')}] are not defined`
      }
      return reject(msg)
    } else {
      resolve()
    }
  })
}

function loadAssertLibrary() {
  return new Promise(async resolve => {
    if (!ASSERT_LIBRARY_CONTENT) {
      const assertLibraryResponse = await fetchUrl('/assets/Assert.sol')
      ASSERT_LIBRARY_CONTENT = assertLibraryResponse.data
    }
    resolve(ASSERT_LIBRARY_CONTENT)
  })
}

function compileAssertLibrary(compiler, optimize) {
  return new Promise(async resolve => {
    const assertLibrary = await loadAssertLibrary()
    const assertLibraryCompiled = await compileExerciseBlock(
      compiler,
      { sources: { 'Assert.sol': assertLibrary } },
      optimize,
      'AssertLib',
    )
    resolve(assertLibraryCompiled)
  })
}

function compileTestExercise(compiler, validation, exerciseInterfaces, optimize) {
  return new Promise(async (resolve, reject) => {
    try {
      const assertLibrary = await loadAssertLibrary()
      const exerciseInterfaceNames = exerciseInterfaces.map(snip => snip.name)

      // Make test available for any user-specified contract
      const validationTransformed = transformSolidityTest(validation, exerciseInterfaceNames)

      // Compile interfaces, assert library and test code
      const input = exerciseInterfaces.reduce(function (acc, inter) {
        const m = {}
        m[inter.name + '.sol'] = inter.code
        return _.extend(acc, m)
      }, {})

      input['Assert.sol'] = assertLibrary
      input['test.sol'] = validationTransformed

      const compiled = await compileExerciseBlock(compiler, { sources: input }, optimize, 'Validation')

      resolve(compiled)
    } catch (err) {
      reject(err.message || err)
    }
  })
}
