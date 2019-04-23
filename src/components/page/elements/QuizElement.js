import React from 'react'
import MultipleChoiceQuestionElement from './MultipleChoiceQuestionElement'

class QuizElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentQuestion: 0 }
    this.nextQuestionClicked = this.nextQuestionClicked.bind(this)
  }

  componentDidMount() {
    if (this.props.content) {
      this.setState({ currentQuestion: 0, maxQuestions: this.props.content.length, finished: false })
    }
  }

  nextQuestionClicked() {
    const nextQuestion = this.state.currentQuestion + 1
    if (nextQuestion === this.state.maxQuestions) return this.setState({ finished: true })
    return this.setState({ currentQuestion: nextQuestion })
  }

  render() {
    return (
      <div className={'hero mb30 has-background-info exercise-box'}>
        <div className={'exercise-header'}>
          <p className={'subtitle has-text-white has-text-weight-bold is-marginless'}>
            Quiz
            <span className={'is-pulled-right is-right has-text-left'}>
              {`Question ${this.state.currentQuestion + 1}/${this.props.content.length}`}
            </span>
          </p>
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

  getQuizCompletedText() {
    return (
      <div className={'hero has-background-info exercise-box'}>
        <div className={'exercise-body has-background-white'}>
          <div className={'result-box'}>Quiz completed!</div>
        </div>
      </div>
    )
  }
}

export default QuizElement
