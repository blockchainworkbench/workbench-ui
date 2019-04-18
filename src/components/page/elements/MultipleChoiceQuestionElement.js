import React from 'react'
import ContentArray from '../ContentArray'
import shajs from 'sha.js'

class MultipleChoiceQuestionElement extends React.Component {
  render() {
    return (
      <div className={'mb30'}>
        <div className={'hero has-background-info exercise-box'}>
          <div className={'exercise-header'}>
            <p className={'subtitle has-text-white has-text-weight-bold is-marginless'}>
              Question

            </p>
          </div>
          <div className={'exercise-body has-background-white'}>
            <div className={'has-background-grey-lighter'}>
              <ContentArray content={this.props.content.question} />
            </div>
            <div>
              <ul className={'menu-list mcq-answers'}>{this.getAnswers()}</ul>
            </div>
            <div>
              <div className={'button has-text-left has-background-info has-text-white is-fullwidth'}>Submit</div>
            </div>
          </div>
        </div>
        {this.getHint()}
      </div>
    )
  }

  getHint() {
    if (this.props.content.hints !== '') {
      console.log(this.props.content.hints)
      return (
        <div>
          <span>Hint: </span>
          <ContentArray content={this.props.content.hints} />
        </div>
      )
    }
    return null
  }

  getAnswers() {
    if (!this.props.content.multiplechoice) {
      return this.getRadioAnswers()
    }
    return this.props.content.answers.map(answer => {
      return (
        <li>
          <a>
            <label className={'checkbox'}>
              <input type={'checkbox'} className={'mr10'} />
              <ContentArray content={answer.content[0].answer} />
            </label>
          </a>
        </li>
      )
    })
  }

  getRadioAnswers() {
    const questionHash = shajs('sha256')
      .update(JSON.stringify(this.props.content.question) + JSON.stringify(this.props.content.answers))
      .digest('hex')
    return this.props.content.answers.map(answer => {
      return (
        <li>
          <a>
            <label className={'radio'}>
              <input type={'radio'} name={questionHash} className={'mr10'} />
              <ContentArray content={answer.content[0].answer} />
            </label>
          </a>
        </li>
      )
    })
  }
}

export default MultipleChoiceQuestionElement
