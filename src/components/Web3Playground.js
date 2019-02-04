import React from 'react';

import {connect} from 'react-redux';
import {checkWeb3Account, COMPILER_STATE, loadCompiler, WEB3_ACCOUNT_STATE, compile, CODE_STATE} from "../actions";
import TitleHeader from "./layout/TitleHeader";

const COMPILER_VERSION = 'soljson-v0.4.24+commit.e67f0147.js';
const CODE_ID = 'web3Playground';

class Web3Playground extends React.Component {


    constructor(props) {
        super(props);
        this.checkAccountAccess = this.checkAccountAccess.bind(this);
        this.loadCompiler = this.loadCompiler.bind(this);
        this.getCompilerInfo = this.getCompilerInfo.bind(this);
        this.getCompileInfo = this.getCompileInfo.bind(this);
        this.compile = this.compile.bind(this);
    }

    componentDidMount() {
        this.checkAccountAccess();
    }

    checkAccountAccess() {
        console.log('Checking access to web3 accounts');
        this.props.checkWeb3Account();
    }

    loadCompiler() {
        console.log('Load Compiler clicked');
        this.props.loadCompiler(COMPILER_VERSION);
    }

    compile() {
        const optimize = 1;
        const userSolution = "pragma solidity ^0.4.24;\n\ncontract SpaceMuffin {\n  // Secret recipe is here but inaccessible externally\n  function superSecretRecipe () private pure returns (string) {\n    return \"Ingredients: 1L SpaceMilk, 100g SpaceButter and 100g SpaceChocolate. Instructions: Mix, then bake 45min in your SpaceOven\";\n  }\n\n  function contactMe () external pure returns (string) {\n    // As a malicious attacker, you want to expose the recipe\n    return ;\n  }\n}";
        const exerciseSolution = "pragma solidity ^0.4.24;\n\ncontract SpaceMuffin {\n  function superSecretRecipe () private pure returns (string) {\n    // Add some SpaceVanillaSugar to make them taste better\n    return \"Ingredients: 1L SpaceMilk, 100g SpaceButter and 100g SpaceChocolate. Instructions: Mix, then bake 45min in your SpaceOven\";\n  }\n\n  function contactMe () external pure returns (string) {\n    // What a horrible person you are\n    // Exposing top secret information\n    return superSecretRecipe();\n  }\n}";
        this.props.compile(CODE_ID, this.props.compiler.compiler, userSolution, exerciseSolution, optimize);
    }

    render() {
        return (<section className="hero">
            <TitleHeader/>
            <div className="hero-body">
                <div className="container has-text-centered">
                    {this.getContent()}
                    <button onClick={this.loadCompiler}>Load Compiler</button>
                    {this.getCompilerInfo()}
                    {this.getCompileInfo()}
                </div>
            </div>
        </section>)
    }

    getCompileInfo() {
        if (this.isCompilerLoaded()) {
            const button = <button onClick={this.compile}>Compile</button>;
            if(this.props.compiledCode) {
                switch (this.props.compiledCode.state) {
                    case CODE_STATE.COMPILED:
                        return <p>Code Compiled!</p>;
                    case CODE_STATE.COMPILING:
                        return <p>Compiling....</p>;
                    case CODE_STATE.ERROR:
                        return <p>Compile failed: {this.props.compiledCode.error}<br/>{button}</p>
                    default:
                        return button;
                }
            }
            return button;
        }
        return null;
    }

    isCompilerLoaded() {
        return this.props.compiler && this.props.compiler.state === COMPILER_STATE.LOADED;
    }

    getCompilerInfo() {
        if (this.props.compiler) {
            switch (this.props.compiler.state) {
                case COMPILER_STATE.LOADING:
                    return <p>Loading</p>;
                case COMPILER_STATE.LOADED:
                    return <p>Loaded</p>;
                case COMPILER_STATE.ERROR:
                    return <p>Error: <strong>{this.props.compiler.error}</strong></p>;
                default:
                    return <p>Unknown state {this.props.compiler.state}</p>;
            }
        } else {
            return <p>Compiler not set</p>;
        }
    }

    getContent() {
        switch (this.props.web3Account.state) {
            case WEB3_ACCOUNT_STATE.PENDING:
                return (<div>
                    <h1 className='title is-3'>
                        <p className='icon loading has-text-info mr10'><i className='fas fa-spinner fa-spin'/></p>
                        Authorizing Account access..
                    </h1>
                    <div>
                        Please grant access to MetaMask.
                        <button onClick={this.checkAccountAccess}>Prompt again</button>
                    </div>
                </div>);
            case WEB3_ACCOUNT_STATE.UNAUTHORIZED:
                return (<div><h1 className='title is-3 has-text-danger'>Access not granted</h1>
                    <p>{this.props.web3Account.error}</p>
                    <button onClick={this.checkAccountAccess}>Prompt for Access again</button>
                </div>);
            case WEB3_ACCOUNT_STATE.UNSUPPORTED:
                return (<div><h1 className='title is-3 has-text-danger'>MetaMask is not installed</h1>
                    <p>{this.props.web3Account.error}</p></div>);
            case WEB3_ACCOUNT_STATE.AUTHORIZED:
                const acc = window.web3.eth.accounts[0];
                return (<div><h1 className='title is-3 has-text-success'>Account Access authorized!</h1>
                    <div className='has-text-right'>
                        <p>window.web3.eth.accounts[0]:
                            <span className='has-text-success has-text-weight-bold'>{acc}</span>
                        </p>
                        <p>address from web3-update-event:
                            <span className='has-text-success has-text-weight-bold'>
                                {this.props.web3Account.address}
                            </span>
                        </p>
                        <p>Network:
                            <span className='has-text-success has-text-weight-bold'>
                                {this.props.web3Account.networkId}
                            </span>
                        </p>
                        <p>You are in the {this.props.web3Account.validNetwork
                            ? <span className='has-text-success has-text-weight-bold'>correct</span>
                            : <span className='has-text-danger has-text-weight-bold'>wrong</span>} network.</p>
                    </div>
                </div>);
            default:
                return (<div><h1>Unexpected state: {this.props.web3Account.state}</h1></div>);
        }
    }

}

const mapStateToProps = (state) => {
    return {
        web3Account: state.appState.web3Account,
        web3State: state.appState.web3Account.state,
        web3Error: state.appState.web3Account.error,
        compiler: state.appState.solidity.compiler.find(compiler => compiler.version === COMPILER_VERSION),
        compiledCode: state.appState.solidity.code.find(code => code.codeId === CODE_ID)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkWeb3Account: () => dispatch(checkWeb3Account()),
        loadCompiler: (version) => dispatch(loadCompiler(version)),
        compile: (codeId, compiler, userSolution, exerciseSolution, optimize) =>
            dispatch(compile(codeId, compiler, userSolution, exerciseSolution, optimize))
    };
};

const ConnectedWeb3Playground = connect(mapStateToProps, mapDispatchToProps)(Web3Playground);
export default ConnectedWeb3Playground;