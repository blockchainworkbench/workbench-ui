import {ACTIONS} from "../../actions";
import {COMPILER_STATE} from "../../actions/exercise";


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
            return [...loadList];
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

const solidity = {
    compiler: compiler
};

export default solidity;
