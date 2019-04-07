import React from 'react'
import CodeEditor from '../CodeEditor'
import { connect } from 'react-redux'
import ContentArray from '../ContentArray'
import { EXERCISE_STATE, resetExerciseErrorCount, runExercise } from '../../../actions/exercise'

const COMPILER_VERSION = 'soljson-v0.4.24+commit.e67f0147.js'

class ExerciseElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: props.content[0].initial,
      submitted: '',
      progress: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showSolutionClicked = this.showSolutionClicked.bind(this)
  }

  handleChange(event) {
    this.setState({ content: event })
  }

  handleSubmit() {
    this.setState({ content: this.state.content, submitted: this.state.content })
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.content)
    }
    const userCode = this.state.content
    const solution = this.props.content[0].solution
    const validation = this.props.content[0].validation.deployed
    const codeId = this.props.content[0].id
    this.props.runExercise(codeId, COMPILER_VERSION, userCode, solution, validation, 1)
  }

  getProgress() {
    if (this.props.exercise) {
      if (this.props.exercise.state === EXERCISE_STATE.ERROR) {
        return (
          <div className={'has-text-danger has-text-weight-bold has-background-light has-text-left'}>
            <i className="fas fa-exclamation-triangle ml10" />
            <span className={'ml10'}>
              {this.props.exercise.message}: {this.props.exercise.error}
            </span>
          </div>
        )
      } else {
        if (this.props.exercise.state === EXERCISE_STATE.SUCCESS) {
          return (
            <div className={'has-background-success has-text-weight-bold has-text-white'}>
              <i className="far fa-thumbs-up mr10 ml10" />
              Correct!
            </div>
          )
        }
        let spinner = ''
        if (this.props.exercise.state.includes('ing')) {
          spinner = <i className="fa fa-spinner fa-pulse fa-fw mr10 ml10" />
        }
        return (
          <div className={'has-background-light has-text-left'}>
            {spinner}
            {this.props.exercise.message}
          </div>
        )
      }
    } else {
    }
    return null
  }

  render() {
    if (this.props.content && this.props.content.length > 0) {
      return (
        <div className={'hero mb30 has-background-info exercise-box'}>
          <div className={'exercise-header'}>
            <p className={'subtitle has-text-white has-text-weight-bold is-marginless'}>
              {this.props.content.title || 'Exercise'}
              <a onClick={this.handleSubmit} className={'button is-pulled-right is-right has-text-left'}>
                Submit
              </a>
            </p>
            {this.getProgress()}
          </div>
          <div className={'exercise-body'}>
            {this.getDescription()}
            {this.getShowSolutionButton()}
            <CodeEditor id={`exercise-${this.props.id}`} content={this.state.content} onChange={this.handleChange} />
          </div>
        </div>
      )
    } else {
      return <span className={'has-background-danger has-text-white'}>Invalid Exercise Element</span>
    }
  }

  getDescription() {
    return (
      <div className={'has-text-left has-background-grey-lighter'}>
        <ContentArray content={this.props.content[0].description} />
      </div>
    )
  }

  getShowSolutionButton() {
    if (this.props.exercise && this.props.exercise.errorCount >= 2) {
      return (
        <div className="has-text-left has-background-warning">
          <button className="button is-small is-fullwidth is-warning" onClick={this.showSolutionClicked}>
            Show Solution
          </button>
        </div>
      )
    }
    return null
  }

  showSolutionClicked() {
    this.setState({ content: this.props.content[0].solution })
    this.props.resetExercise(this.props.content[0].id)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    exercise: state.appState.exercises.find(ex => ex.codeId === ownProps.content[0].id),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    runExercise: (id, version, user, solution, validation, optimize) =>
      dispatch(runExercise(id, version, user, solution, validation, optimize)),
    resetExercise: id => dispatch(resetExerciseErrorCount(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExerciseElement)
