import React from 'react'
import TitleHeader from '../layout/TitleHeader'
import { connect } from 'react-redux'
import { loadUserProfile } from '../../actions/user'
import { Link, Redirect } from 'react-router-dom'

class Profile extends React.Component {
  componentDidMount() {
    this.loadProfile()
    this.setState({ mounted: true })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadProfile()
  }

  loadProfile() {
    if (!this.props.user.loading && !this.state && !this.props.user.error) {
      console.log('loading profile information')
      this.props.loadProfile()
    }
  }

  render() {
    return (
      <section className="hero">
        <TitleHeader />
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">User Profile</h1>
            {this.props.user.authenticated ? this.getUserProfile() : this.getLoadingInfo()}
          </div>
        </div>
      </section>
    )
  }

  getLoadingInfo() {
    if (this.props.user.loading) {
      return (
        <div>
          <span className="icon loading has-text-info">
            <i className="fas fa-spinner fa-spin" />
          </span>
          <span>Loading profile...</span>
        </div>
      )
    } else {
      return <Redirect to="/login" />
    }
  }

  getUserFieldsTable() {
    const fields = []
    fields.push(this.getLabelRow(1, 'id', this.props.user.id))
    fields.push(this.getLabelRow(2, 'Display Name', this.props.user.displayName))
    fields.push(this.getLabelRow(3, 'email', this.props.user.email))
    fields.push(this.getLabelRow(4, 'Public Key', this.props.user.publicKey))
    fields.push(this.getLabelRow(5, 'Created', this.props.user.dateCreated))
    fields.push(
      this.getLabelRow(
        6,
        '',
        <Link to="/profile/edit" className="button is-info">
          Edit Profile
        </Link>,
      ),
    )
    return <div className="content">{fields}</div>
  }

  hasExercises() {
    return this.props.user.exercises && this.props.user.exercises.length > 0
  }

  hasQuizzes() {
    return this.props.user.quizzes && this.props.user.quizzes.length > 0
  }

  getUserExercises() {
    const title = `Completed Exercises ${this.hasExercises() ? '(' + this.props.user.exercises.length + ')' : ''}`
    const content = [
      <h1 key={0} className="title">
        {title}
      </h1>,
    ]
    if (this.hasExercises()) {
      content.push(
        <ul key="ex-list">
          {this.props.user.exercises.map(ex => {
            return (
              <li key={ex.id}>
                Exercise <strong>{ex.title}</strong> ({ex.id})
                {ex.date ? ' on ' + new Date(ex.date * 1000).toLocaleString() : null}
              </li>
            )
          })}
        </ul>,
      )
    } else {
      content.push(<i key={1}>No exercises completed yet.</i>)
    }
    return <div className="content">{content}</div>
  }

  getUserQuizzes() {
    const title = `Completed Quizzes ${this.hasQuizzes() ? '(' + this.props.user.quizzes.length + ')' : ''}`
    const content = [
      <h1 key={0} className="title">
        {title}
      </h1>,
    ]
    if (this.hasQuizzes()) {
      content.push(
        <ul key="ex-list">
          {this.props.user.quizzes.map(quiz => {
            return (
              <li key={quiz.id}>
                Quiz <strong>{quiz.id}</strong>
                {quiz.date ? ' on ' + new Date(quiz.date * 1000).toLocaleString() : null}
              </li>
            )
          })}
        </ul>,
      )
    } else {
      content.push(<i key={1}>No quizzes completed yet.</i>)
    }
    return <div className="content">{content}</div>
  }

  getUserProfile() {
    return (
      <>
        {this.getUserFieldsTable()}
        {this.getUserExercises()}
        {this.getUserQuizzes()}
      </>
    )
  }

  getLabelRow(key, label, value) {
    return (
      <div key={key} className="field is-horizontal">
        <div className="field-label">
          <label className="label">{label}</label>
        </div>
        <div className="field-body">
          <div className="field has-text-left">{value}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.appState.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProfile: () => dispatch(loadUserProfile()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
