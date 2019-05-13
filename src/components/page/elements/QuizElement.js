import React from 'react'
import MultipleChoiceQuestionElement from './MultipleChoiceQuestionElement'
import { checkQuizStatus, markQuizSolved } from '../../../actions/quiz'
import { connect } from 'react-redux'

class QuizElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentQuestion: 0 }
    this.nextQuestionClicked = this.nextQuestionClicked.bind(this)
    this.resetClicked = this.resetClicked.bind(this)
  }

  componentDidMount() {
    if (!this.quizCompleted()) {
      this.props.checkQuizStatus(this.props.element.id)
    }
    if (this.props.content) {
      this.setState({ currentQuestion: 0, maxQuestions: this.props.content.length, finished: false })
    }
  }

  nextQuestionClicked() {
    const nextQuestion = this.state.currentQuestion + 1
    if (nextQuestion === this.state.maxQuestions) {
      this.props.markQuizSolved(this.props.element.id)
      return this.setState({ finished: true })
    }
    return this.setState({ currentQuestion: nextQuestion })
  }

  resetClicked() {
    this.setState({ finished: false, currentQuestion: 0 })
  }

  render() {
    return (
      <div className={'hero mb30 has-background-info exercise-box'}>
        <div className={'exercise-header'}>
          <h2 className={'subtitle has-text-white has-text-weight-bold is-marginless'}>
            <div>
              Quiz
              {this.getCompletedIcon()}
            </div>
            <div className={'is-pulled-right is-right has-text-left'}>
              {`Question ${this.state.currentQuestion + 1}/${this.props.content.length}`}
            </div>
          </h2>
        </div>
        <div className={'exercise-body'}>
          {this.state.finished ? (
            this.getQuizCompletedText()
          ) : (
            <MultipleChoiceQuestionElement
              key={this.state.currentQuestion}
              content={this.props.content[this.state.currentQuestion].content}
              quiz
              lastQuestion={this.state.currentQuestion + 1 === this.state.maxQuestions}
              nextQuestion={this.nextQuestionClicked}
            />
          )}
        </div>
      </div>
    )
  }

  getCompletedIcon() {
    if (this.quizCompleted()) {
      return (
        <span className="ml10 icon has-text-success" title={'You have solved this quiz.'}>
          <i className="far fa-check-circle" />
        </span>
      )
    }
    return null
  }

  quizCompleted() {
    return this.props.quizCompleted
  }

  getQuizCompletedText() {
    return (
      <div className={'hero has-background-info exercise-box'}>
        <div className={'exercise-body has-background-white'}>
          <div className={'result-box'}>Quiz completed!</div>
          <div onClick={this.resetClicked} className={'quiz-button-box  has-background-info has-text-white button'}>
            Take Quiz again
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    quizCompleted: state.progress.quizzes.includes(ownProps.element.id),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkQuizStatus: id => dispatch(checkQuizStatus(id)),
    markQuizSolved: id => dispatch(markQuizSolved(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizElement)
