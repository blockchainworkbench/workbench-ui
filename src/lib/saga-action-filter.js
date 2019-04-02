import {ACTIONS} from "../actions";

export const exerciseDeployedAction = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.DEPLOY_CONTRACTS_SUCCESS;
export const exerciseDeployedFailure = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.DEPLOY_CONTRACTS_FAILURE;
export const exerciseCompiledSuccess = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.COMPILE_SUCCESS;
export const exerciseCompiledFailure = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.COMPILE_FAILURE;
export const exerciseTestSuccess = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.TEST_CONTRACTS_SUCCESS;
export const exerciseTestFailure = (actionCodeId, target) =>
    target.codeId === actionCodeId && target.type === ACTIONS.TEST_CONTRACT_FAILURE;
export const compilerLoaded = (compilerVersion, target) =>
    target.version === compilerVersion && target.type === ACTIONS.LOAD_COMPILER_SUCCESS;
