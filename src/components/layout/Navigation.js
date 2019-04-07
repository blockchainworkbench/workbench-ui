import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link'
import LoadingIndicator from './LoadingIndicator'
import { connect } from 'react-redux'
import { loadUserProfile } from '../../actions/user'
import brandLogo from '../../assets/img/brand-logo-white-small.png'

class Navigation extends React.Component {
  componentDidMount() {
    this.loadProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadProfile()
  }

  loadProfile() {
    if (!this.props.user.loading && !this.props.user.authenticated && !this.props.user.error) {
      this.props.loadProfile()
    }
  }

  render() {
    return (
      <nav className={'navbar is-fixed-top is-transparent'}>
        <div className={'navbar-brand'}>
          <Link to={'/'}>
            <img className={'image'} src={brandLogo} />
          </Link>
        </div>
        <div className={'navbar-end'}>
          <LoadingIndicator />
          <NavHashLink className={'navbar-item has-text-white'} activeClassName={'is-active'} to={'/search'}>
            <i className="icon fas fa-search" />
          </NavHashLink>
          {this.getLoginOrProfileNav()}
        </div>
      </nav>
    )
  }

  getLoginOrProfileNav() {
    if (this.props.user.authenticated) {
      return (
        <div>
          <NavLink className={'navbar-item has-text-white'} activeClassName={'is-active'} to={'/profile'}>
            {this.props.user.displayName}
          </NavLink>
          <NavLink className={'navbar-item has-text-white'} activeClassName={'is-active'} to={'/logout'}>
            Logout
          </NavLink>
        </div>
      )
    } else {
      return (
        <NavLink className={'navbar-item has-text-white'} activeClassName={'is-active'} to={'/login'}>
          Login
        </NavLink>
      )
    }
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
)(Navigation)
