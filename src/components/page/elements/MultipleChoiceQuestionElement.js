import React from 'react'
import ContentArray from '../ContentArray'
import { getSHA256 } from '../../../lib/helpers'

class MultipleChoiceQuestionElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: [], submitted: false, showHints: false }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this)
    this.handleBackClicked = this.handleBackClicked.bind(this)
    this.handleNextClicked = this.handleNextClicked.bind(this)
  }

  render() {
    return (
      <div className={this.props.quiz ? '' : 'mb30'}>
        <div className={'hero has-background-info exercise-box'}>
          {this.getQuestionHeader()}
          <div className={'exercise-body has-background-white'}>
            <div className={'has-background-grey-lighter'}>
              <ContentArray content={this.props.content.question} />
            </div>
            {this.getHint()}
            {this.state.submitted ? this.getResult() : this.getForm()}
          </div>
        </div>
      </div>
    )
  }

  getQuestionHeader() {
    if (this.props.quiz) return null
    return (
      <div className={'exercise-header'}>
        <p className={'subtitle has-text-white has-text-weight-bold is-marginless'}>
          Question {this.props.content.multiplechoice ? '(multi)' : '(single)'}
        </p>
      </div>
    )
  }

  getForm() {
    return (
      <>
        <div>
          <form>
            <ul className={'mcq-answers'}>{this.getAnswers()}</ul>
          </form>
        </div>
        <div>
          <div
            onClick={this.handleQuestionSubmit}
            className={'quiz-button-box button has-text-left has-background-info has-text-white'}
          >
            Submit
          </div>
        </div>
      </>
    )
  }

  getResult() {
    let textContent = ''
    let buttonContent = ''
    if (this.state.answeredCorrectly) {
      textContent = 'Correct.'
      buttonContent = (
        <>
          {this.props.quiz ? (
            <div
              onClick={this.handleNextClicked}
              className={'button has-text-left has-background-success quiz-button-box'}
            >
              Next Question
            </div>
          ) : null}
          <div onClick={this.handleBackClicked} className={'button has-text-left quiz-button-box'}>
            back
          </div>
        </>
      )
    } else {
      textContent = 'Wrong.'
      buttonContent = (
        <div onClick={this.handleBackClicked} className={'button has-text-left has-background-danger quiz-button-box'}>
          Try again.
        </div>
      )
    }
    return (
      <>
        <div className={'result-box'}>{textContent}</div>
        <div>{buttonContent}</div>
      </>
    )
  }

  getHint() {
    if (this.props.content.hints !== '' && this.state.showHints) {
      return (
        <div className={'has-background-warning'}>
          <strong>Hint: </strong>
          <ContentArray content={this.props.content.hints} />
        </div>
      )
    }
    return null
  }

  handleBackClicked() {
    this.setState({ submitted: false })
  }

  handleNextClicked() {
    console.log('next clicked')
  }

  handleQuestionSubmit() {
    let answeredCorrectly = this.checkAnswers()
    this.setState({ submitted: true, answeredCorrectly, showHints: !answeredCorrectly })
    console.log('Your answer is ', answeredCorrectly)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if (this.props.content.multiplechoice) {
      let newSelectedState = this.state.selected
      if (value && newSelectedState.filter(itm => itm === name).length === 0) {
        newSelectedState.push(name)
      }
      if (!value && newSelectedState.filter(itm => itm === name).length >= 1) {
        newSelectedState = newSelectedState.filter(itm => itm !== name)
      }
      this.setState({ selected: newSelectedState })
    } else {
      this.setState({ selected: [value] })
    }
  }

  checkAnswers() {
    let answeredCorrectly = false
    const correctAnswers = this.getCorrectAnswers()
    if (this.props.content.multiplechoice) {
      if (correctAnswers.length === this.state.selected.length) {
        answeredCorrectly = correctAnswers.reduce((acc, value) => {
          const t = this.state.selected.filter(itm => itm === value).length >= 1
          return acc && t
        }, true)
      }
    } else {
      answeredCorrectly = correctAnswers.length === 1 && correctAnswers[0] === this.state.selected[0]
    }
    return answeredCorrectly
  }

  getCorrectAnswers() {
    const correctAnswers = []
    this.props.content.answers.forEach(answer => {
      if (answer.content[0].value && (this.props.content.multiplechoice || correctAnswers.length === 0)) {
        correctAnswers.push(getSHA256(JSON.stringify(answer.content[0].answer)))
      }
    })
    return correctAnswers
  }

  getAnswers() {
    if (!this.props.content.multiplechoice) {
      return this.getRadioAnswers()
    }
    return this.getCheckboxAnswers()
  }

  getCheckboxAnswers() {
    return this.props.content.answers.map(answer => {
      const answerHash = getSHA256(JSON.stringify(answer.content[0].answer))
      return (
        <li>
          <label className={'checkbox'}>
            <input
              type={'checkbox'}
              className={'mr10'}
              name={answerHash}
              value={answer.content[0].answer}
              checked={this.isSelected(answerHash)}
              onChange={this.handleInputChange}
            />
            <ContentArray content={answer.content[0].answer} />
          </label>
        </li>
      )
    })
  }

  getRadioAnswers() {
    const questionHash = getSHA256(
      JSON.stringify(this.props.content.question) + JSON.stringify(this.props.content.answers),
    )
    return this.props.content.answers.map(answer => {
      const answerHash = getSHA256(JSON.stringify(answer.content[0].answer))
      return (
        <li>
          <label className={'radio'}>
            <input
              type={'radio'}
              name={questionHash}
              className={'mr10'}
              onChange={this.handleInputChange}
              value={answerHash}
              checked={this.isSelected(answerHash)}
            />
            <ContentArray content={answer.content[0].answer} />
          </label>
        </li>
      )
    })
  }

  isSelected(value) {
    return this.state.selected.filter(itm => itm === value).length !== 0
  }
}

export default MultipleChoiceQuestionElement
