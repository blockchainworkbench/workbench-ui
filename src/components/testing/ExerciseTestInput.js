import React from 'react';
import {connect} from "react-redux";
import {setTestExercise} from "../../actions/testing";
import shajs from 'sha.js';

class ExerciseTestInput extends React.Component {

    REGEX_EXERCISE_TAG = /{%\s\w+\s%}/g;
    REGEX_FIRST_NEWLINE = /\n/;
    REGEX_ALL_NEWLINE = /\n/g;
    REGEX_LAST_NEWLINE = /\n$/;

    constructor(props) {
        super(props);
        this.state = {exercise: ''};
        this.exerciseChanged = this.exerciseChanged.bind(this);
        this.onUpdateClicked = this.onUpdateClicked.bind(this);
    }

    render() {
        return (
            <>
                <h1 className='title is-4'>Input</h1>
                <div>
                    <textarea className='textarea' rows='20' value={this.state.exercise}
                              onChange={this.exerciseChanged}/>
                </div>
                <button className='button is-fullwidth' onClick={this.onUpdateClicked}>Update</button>
            </>);
    }

    getParsedExercise(exercise) {
        let allTags = this.REGEX_EXERCISE_TAG;
        let elements = exercise.split(this.REGEX_EXERCISE_TAG);
        if (elements.length <= 4) {
            throw Error('Invalid Exercise');
        }
        let values = [];
        let currentTitle = null;
        let i = 1;
        do {
            currentTitle = allTags.exec(exercise);
            if (currentTitle) {
                let titleString = this.extractTagNameFromTag(currentTitle[0]);
                values[titleString] = elements[i];
            }
            i++;
        } while (currentTitle);
        const result = {
            title: this.removeAllNewLine(values['title'], 'title'),
            description: this.removeAllNewLine(values['exercise'], 'exercise'),
            initial: this.removeFirstAndLastNewLine(values['initial'], 'initial'),
            hints: this.removeFirstAndLastNewLine(values['hints']),
            solution: this.removeFirstAndLastNewLine(values['solution'], 'solution'),
            validation: this.removeFirstAndLastNewLine(values['validation'])
        };
        result.id = shajs('sha256').update(JSON.stringify(result)).digest('hex');
        return result;
    }

    exerciseChanged(event) {
        this.setState({exercise: event.target.value})
    }

    onUpdateClicked() {
        try {
            let ex = this.getParsedExercise(this.state.exercise);
            this.props.setTestExercise(ex, null);
        } catch (e) {
            this.props.setTestExercise(null, e.message);
        }
    }

    /**
     * Returns the input string with the first and last newlines '\n' removed.
     * If input is undefined and name is defined, an error is thrown with the name as indicator.
     * If input and name is undefined, an empty string is returned
     * @param input string
     * @param name string
     * @returns string
     */
    removeFirstAndLastNewLine(input, name) {
        if (input) {
            return input.replace(this.REGEX_FIRST_NEWLINE, '').replace(this.REGEX_LAST_NEWLINE, '')
        }
        if (name) {
            throw Error(name + ' does not exist');
        }
        return '';
    }

    /**
     * Returns the input string with all newlines '\n' removed from it.
     * If input is undefined and name is defined, an error is thrown with the name as indicator.
     * If input and name is undefined, an empty string is returned
     * @param input string
     * @param name string
     * @returns string
     */
    removeAllNewLine(input, name) {
        if (input) {
            return input.replace(this.REGEX_ALL_NEWLINE, '');
        }
        if (name) {
            throw Error(name + ' does not exist');
        }
        return '';
    }

    extractTagNameFromTag(tag) {
        if (tag) {
            return tag.replace('{%', '').replace('%}', '').trim();
        }
        return '';
    }

}

const mapDispatchToProps = dispatch => {
    return {
        setTestExercise: (exercise, error) => dispatch(setTestExercise(exercise, error))
    }
};

export default connect(null, mapDispatchToProps)(ExerciseTestInput);
