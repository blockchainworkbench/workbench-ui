import {ACTIONS, CODE_STATE, COMPILER_STATE} from "../../actions";


const compiler = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.LOAD_COMPILER_SUCCESS:
            return [...state.map(compiler => {
                if (compiler.version === action.version) {
                    return Object.assign({}, {
                        version: action.version,
                        state: COMPILER_STATE.LOADED,
                        compiler: action.compiler,
                        error: null
                    });
                } else return compiler;
            })];
        case ACTIONS.LOAD_COMPILER:
            const loadList = [...state.map(compiler => {
                if (compiler.version === action.version) {
                    if (compiler.state === COMPILER_STATE.LOADED) return compiler;
                    else return Object.assign({}, compiler,
                        {state: COMPILER_STATE.LOADING, error: null});
                } else return compiler;
            })];
            const findComp = loadList.find(compiler => compiler.version === action.version);
            if (findComp === undefined) {
                loadList.push({
                    version: action.version,
                    state: COMPILER_STATE.LOADING,
                    error: null, compiler: null
                });
            }
            return loadList;
        case ACTIONS.LOAD_COMPILER_FAILURE:
            return [...state.map(compiler => {
                if (compiler.version === action.version) return Object.assign({}, compiler,
                    {error: action.error, state: COMPILER_STATE.ERROR});
                else return compiler;
            })];
        default:
            return state;
    }
};

const code = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.COMPILE :
            const newCode = {codeId: action.codeId, state: CODE_STATE.COMPILING};
            const codes = [...state.map(code => {
                if (code.codeId === action.codeId) {
                    return newCode;
                } else return code;
            })];
            const findCode = codes.find(code => code.codeId === action.codeId);
            if (findCode === undefined) codes.push(newCode);
            return codes;
        case ACTIONS.COMPILE_SUCCESS :
            return [...state.map(code => {
                if (code.codeId === action.codeId) {
                    return {codeId: code.codeId, state: CODE_STATE.COMPILED, code: action.code};
                } else return code;
            })];
        case ACTIONS.COMPILE_FAILURE :
            return [...state.map(code => {
                if (code.codeId === action.codeId) {
                    return {codeId: code.codeId, error: action.error};
                } else return code;
            })];
        default:
            return state;
    }
};

const solidity = {
    compiler: compiler,
    code: code,
};

export default solidity;