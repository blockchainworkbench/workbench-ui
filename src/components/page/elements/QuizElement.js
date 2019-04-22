import React from 'react'
import MultipleChoiceQuestionElement from './MultipleChoiceQuestionElement'

class QuizElement extends React.Component {
  render() {
    return (
      <div className={'hero mb30 has-background-info exercise-box'}>
        <div className={'exercise-header'}>
          <p className={'subtitle has-text-white has-text-weight-bold is-marginless'}>
            Quiz
            <div className={'is-pulled-right is-right has-text-left'}>{`Question 1/${this.props.content.length}`}</div>
          </p>
        </div>
        <div className={'exercise-body'}>
          <MultipleChoiceQuestionElement content={this.props.content[0].content} quiz />
        </div>
      </div>
    )
  }
}

export default QuizElement
