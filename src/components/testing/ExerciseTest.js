import React from 'react';
import CodeEditor from "../page/CodeEditor";
import {connect} from "react-redux";
import {EXERCISE_STATE} from "../../actions/exercise";
import ReactMarkdown from "react-markdown";
import {testExercise} from "../../actions/testing";

const COMPILER_VERSION = 'soljson-v0.4.24+commit.e67f0147.js';

class ExerciseTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: props.content.initial,
            submitted: '',
            progress: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showSolutionClicked = this.showSolutionClicked.bind(this);
        this.resetClicked = this.resetClicked.bind(this);
    }

    handleChange(event) {
        this.setState({content: event});
    }

    handleSubmit() {
        const userCode = this.state.content;
        const solution = this.props.content.solution;
        const validation = this.props.content.validation;
        this.props.testExercise(COMPILER_VERSION, userCode, solution, validation, 1);
    }

    getProgress() {
        if (this.props.exercise && this.props.exercise.state) {
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
        }
        return null;
    }

    render() {
        if (this.props.content) {
            return (
                <div className='hero mb30'>
                    <div className='container'>
                        {this.getTitle()}
                        {this.getProgress()}
                    </div>
                    <div className='container'>
                        {this.getDescription()}

                        <CodeEditor id={`exercise-${this.props.id}`} content={this.state.content}
                                    onChange={this.handleChange}/>
                        <button onClick={this.handleSubmit} className='button is-link is-fullwidth'>Test Exercise
                            Execution
                        </button>
                    </div>
                    <div className='container'>
                        {this.getActionButtons()}
                        <br/>
                        {this.getHints()}
                        <br/>
                    </div>

                </div>);
        } else {
            return <span className='has-background-danger has-text-white'>Invalid Exercise Element</span>
        }
    }

    getTitle() {
        const title = this.props.content.title;
        return (<p className='is-5 has-background-link has-text-white has-text-left has-text-weight-bold is-marginless'>
            {title === "Exercise" ? '' : "Exercise: "}{title}
        </p>)
    }

    getDescription() {
        return (<div className='has-text-left has-background-grey-lighter'>
            <ReactMarkdown source={this.props.content.description}/>
        </div>);
    }

    getHints() {
        return (<div>
            <strong>Hints:</strong>
            {this.props.exercise.hints ? <ReactMarkdown source={this.props.exercise.hints}/> : ' --'}
        </div>)
    }

    getActionButtons() {
        if (this.props.exercise) {
            return (<div className="has-text-left">
                <strong className='mr10'>Actions:</strong>
                <button className="button is-small has-background-warning mr10" onClick={this.showSolutionClicked}>
                    Show Solution
                </button>
                <button className="button is-small has-background-info" onClick={this.resetClicked}>
                    Reset
                </button>
            </div>);
        }
        return null;
    }

    resetClicked() {
        this.setState({content: this.props.content.initial});
    }

    showSolutionClicked() {
        this.setState({content: this.props.content.solution});
    }
}

const mapStateToProps = (state) => {
    return {
        exercise: state.testing.exercise
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        testExercise: (version, userSolution, exerciseSolution, validation, optimize) =>
            dispatch(testExercise(version, userSolution, exerciseSolution, validation, optimize))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseTest);
