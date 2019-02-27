import React from 'react';
import CodeEditor from "../CodeEditor";
import {EXERCISE_STATE, runExercise} from "../../../actions";
import {connect} from "react-redux";
import ContentArray from "../ContentArray";

const COMPILER_VERSION = 'soljson-v0.4.24+commit.e67f0147.js';

class ExerciseElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: props.content.initial,
            submitted: '',
            progress: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({content: event, submitted: this.state.submitted});
    }

    handleSubmit() {
        this.setState({content: this.state.content, submitted: this.state.content});
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.content);
        }
        const userCode = this.state.content;
        const solution = this.props.content.solution;
        const validation = this.props.content.validation;
        this.props.runExercise(this.props.id, COMPILER_VERSION, userCode, solution, validation, 1);
    }

    getProgress() {
        if (this.props.exercise) {
            if (this.props.exercise.state === EXERCISE_STATE.ERROR) {
                return (<div className='has-text-danger has-text-weight-bold has-background-light has-text-left'>
                    <i className="fas fa-exclamation-triangle ml10"/>
                    <span className='ml10'>{this.props.exercise.message}: {this.props.exercise.error}</span>
                </div>)
            } else {
                if (this.props.exercise.state === EXERCISE_STATE.SUCCESS) {
                    return (<div className='has-background-success has-text-weight-bold has-text-white'>
                        <i className="far fa-thumbs-up mr10 ml10"/>Correct!
                    </div>);
                }
                let spinner = '';
                if (this.props.exercise.state.includes('ing')) {
                    spinner = <i className="fa fa-spinner fa-pulse fa-fw mr10 ml10"/>
                }
                return (<div className='has-background-light has-text-left'>
                    {spinner}{this.props.exercise.message}
                </div>)
            }
        } else {

        }
        return null;
    }

    render() {
        if (this.props.content && this.props.content.length > 0) {
            const content = this.props.content[0];
            console.log('exercise', content);
            return (
                <div className='hero mb30'>
                    <div className='container'>
                        <p className='is-5 has-background-link has-text-white has-text-left has-text-weight-bold is-marginless'>
                            {this.props.content.title || "Exercise"}
                        </p>
                        {this.getProgress()}
                    </div>
                    <div className='container'>
                        <div className='has-text-left has-background-grey-lighter'>
                            <ContentArray content={this.props.content.description}/>
                        </div>
                        <CodeEditor id={`exercise-${this.props.id}`} content={this.state.content}
                                    onChange={this.handleChange}/>
                        <button onClick={this.handleSubmit}
                                className='button is-link is-fullwidth'>Submit
                        </button>
                    </div>
                </div>);
        } else {
         return <span className='has-background-danger has-text-white'>Invalid Exercise Element</span>
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        exercise: state.appState.exercises.find(ex => ex.codeId === ownProps.id)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        runExercise: (id, version, user, solution, validation, optimize) =>
            dispatch(runExercise(id, version, user, solution, validation, optimize))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseElement);
