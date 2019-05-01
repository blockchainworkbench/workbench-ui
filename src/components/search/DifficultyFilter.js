import React from 'react'
import { connect } from 'react-redux'
import { updateDifficultyFilter } from '../../actions/search'
import { getDifficultyColorForTag } from '../../lib/helpers'

const DIFFICULTIES = ['all', 'easy', 'medium', 'hard']

class DifficultyFilter extends React.Component {
  getClassesForDifficultyButton(difficulty) {
    let difficultyClass =
      this.props.difficultyFilter === difficulty ? `${getDifficultyColorForTag(difficulty)} is-active is-focused` : ''
    return `button is-small ${difficultyClass}`
  }

  render() {
    return (
      <div className="dropdown is-right is-hoverable">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>
              Difficulty
              {this.props.difficultyFilter !== DIFFICULTIES[0] ? ` (${this.props.difficultyFilter})` : ''}
            </span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {DIFFICULTIES.map(difficulty => (
              <a
                key={difficulty}
                href={'http://'}
                className="dropdown-item is-capitalized"
                onClick={() => this.handleSubmit(difficulty)}
              >
                {difficulty}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  handleSubmit(difficulty) {
    this.props.updateDifficultyFilter(difficulty)
  }
}

const mapStateToProps = state => ({
  difficultyFilter: state.userSettings.difficultyFilter,
})

const mapDispatchToProps = dispatch => ({
  updateDifficultyFilter: filter => dispatch(updateDifficultyFilter(filter)),
})

const ConnectedDifficultyFilter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DifficultyFilter)
export default ConnectedDifficultyFilter
