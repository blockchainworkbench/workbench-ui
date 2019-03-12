import React from 'react';
import {connect} from 'react-redux';
import {updateDifficultyFilter} from '../../actions/search';
import {getDifficultyColorForTag} from "../../lib/helpers";

class DifficultyFilter extends React.Component {

    getClassesForDifficultyButton(difficulty) {
        return `button is-small
        ${this.props.difficultyFilter === difficulty
            ? `${getDifficultyColorForTag(difficulty)} is-active is-focused`
            : ''}`;
    }

    render() {
        return (<div className='is-pulled-right mb10'>
                <span className='has-text-grey-light float-left mr10'>Difficulty</span>

                <div className='buttons has-addons'>
                    <button className={this.getClassesForDifficultyButton('all')}
                            onClick={() => this.handleSubmit('all')}>
                        <span>All</span></button>
                    <button className={this.getClassesForDifficultyButton('easy')}
                            onClick={() => this.handleSubmit('easy')}>Easy
                    </button>
                    <button className={this.getClassesForDifficultyButton('medium')}
                            onClick={() => this.handleSubmit('medium')}>Medium
                    </button>
                    <button className={this.getClassesForDifficultyButton('hard')}
                            onClick={() => this.handleSubmit('hard')}>Hard
                    </button>
                </div>

            </div>
        );
    }

    handleSubmit(difficulty) {
        this.props.updateDifficultyFilter(difficulty);
    }
}

const mapStateToProps = state => {
    return {
        difficultyFilter: state.userSettings.difficultyFilter
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateDifficultyFilter: filter => dispatch(updateDifficultyFilter(filter))
    };
};

const ConnectedDifficultyFilter = connect(mapStateToProps, mapDispatchToProps)(DifficultyFilter);
export default ConnectedDifficultyFilter;
