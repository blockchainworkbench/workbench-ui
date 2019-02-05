import React from 'react';

import {connect} from 'react-redux';
import {checkWeb3Account, runExercise, WEB3_ACCOUNT_STATE} from "../actions";
import TitleHeader from "./layout/TitleHeader";
import ExerciseElement from "./page/elements/ExerciseElement";

const COMPILER_VERSION = 'soljson-v0.4.24+commit.e67f0147.js';
const CODE_ID = 'web3Playground';

const userSolution = "pragma solidity ^0.4.24;\n\ncontract SpaceMuffin {\n  uint public bite = 0;\n\n  function eat(bytes32 _password) public {\n    // Super Super Simple\n    require(_password == \"Super Super Muffin\");\n    // Super Super Tasty\n    bite = bite + 1;\n  }\n}";
const exerciseSolution = "pragma solidity ^0.4.24;\n\ncontract SpaceMuffin {\n  uint public bite = 0;\n\n  function eat(bytes32 _password) public {\n    // Super Super Simple\n    require(_password == \"Super Super Muffin\");\n    // Super Super Tasty\n    bite = bite + 1;\n  }\n}";
const validation = "[{\"abi\":[{\"constant\":false,\"inputs\":[{\"name\":\"_addresses\",\"type\":\"address[]\"}],\"name\":\"testEatTrue\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addresses\",\"type\":\"address[]\"}],\"name\":\"testEatFalse\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"result\",\"type\":\"bool\"},{\"indexed\":false,\"name\":\"message\",\"type\":\"string\"}],\"name\":\"TestEvent\",\"type\":\"event\"}],\"address\":\"0x0778953B7663cA3eb85b00eEc96f16421B609F1F\"}]";

class Web3Playground extends React.Component {


    constructor(props) {
        super(props);
        this.checkAccountAccess = this.checkAccountAccess.bind(this);
        this.runEx = this.runEx.bind(this);
    }

    componentDidMount() {
        this.checkAccountAccess();
    }

    checkAccountAccess() {
        console.log('Checking access to web3 accounts');
        this.props.checkWeb3Account();
    }

    runEx() {

        this.props.runExercise(CODE_ID, COMPILER_VERSION, userSolution, exerciseSolution, validation, 1);
    }

    render() {
        return (<section className="hero">
            <TitleHeader/>
            <div className="hero-body">
                <div className="container has-text-centered">
                    {this.getExerciseInfo()}
                    <button onClick={this.runEx}>Run Exercise</button>
                    <hr />
                    <ExerciseElement content={{
                        initial: userSolution,
                        solution: exerciseSolution,
                        validation: validation
                    }} id='demoExercise12398' />
                </div>
            </div>
        </section>)
    }

    getExerciseInfo() {
        if (this.props.exercise) {
            return <div>
                <p>State: {this.props.exercise.state}</p>
                <p>Message: {this.props.exercise.message}</p>
                <p>Error: {this.props.exercise.error}</p>
            </div>
        } else {
            return <div>exercise info is null</div>
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
        exercise: state.appState.exercises.find(ex => ex.codeId === CODE_ID)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkWeb3Account: () => dispatch(checkWeb3Account()),
        runExercise: (codeId, compilerVersion, userSolution, exerciseSolution, validation, optimize) =>
            dispatch(runExercise(codeId, compilerVersion, userSolution, exerciseSolution, validation, optimize))
    };
};

const ConnectedWeb3Playground = connect(mapStateToProps, mapDispatchToProps)(Web3Playground);
export default ConnectedWeb3Playground;