import React from 'react';
import {connect} from "react-redux";
import ExerciseTest from "./ExerciseTest";

class ExerciseTestPreview extends React.Component {

    displayError() {
        return this.props.error ? <div className='has-background-danger has-text-white'>{this.props.error}</div> : '';
    }

    displayExercise() {
        if (this.props.error) {
            return '';
        }
        if (this.props.exercise) {
            return <ExerciseTest key={this.props.exercise.id} content={this.props.exercise}/>
        }
        return <i>Enter an exercise on the left panel</i>;
    }

    render() {
        return (
            <>
                <h1 className='title is-4'>Preview</h1>
                {this.displayError()}
                {this.displayExercise()}
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        exercise: state.testing.exercise,
        error: state.testing.error
    }
};

export default connect(mapStateToProps)(ExerciseTestPreview);
