import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import CategoryFilter from '../search/CategoryFilter'
import LoadingIndicator from './LoadingIndicator'
import { connect } from 'react-redux'
import { loadUserProfile } from '../../actions/user'
import brandLogoBlue from '../../assets/img/brand-logo-blue-small.png'
import brandLogoWhite from '../../assets/img/brand-logo-white-small.png'

class Navigation extends React.Component {
  constructor() {
    super()
    this.state = {
      isTop: true,
    }

    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.loadProfile()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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
      <nav
        className={`navbar is-fixed-top short-background-color-transition ${
          this.state.isTop && !this.isSearchActive() ? 'is-transparent' : 'has-shadow-bottom'
        }`}
        ref={el => {
          this.element = el
        }}
      >
        <div className={'navbar-brand'}>
          <Link to={'/'}>
            <img className={'image'} src={this.getHeaderLogo()} alt={'Logo'} />
          </Link>
        </div>
        <div className={'navbar-end'}>
          <LoadingIndicator />
          {this.getSearchComponent()}
          {this.getLoginOrProfileNav()}
        </div>
      </nav>
    )
  }

  getSearchComponent() {
    if (!this.isSearchActive()) {
      return (
        <NavLink
          className={`navbar-item ${this.state.isTop && !this.isSearchActive() ? 'has-text-white' : ''}`}
          to={'/search'}
        >
          <i className={'fas fa-search'} />
        </NavLink>
      )
    } else {
      return (
        <div className={`navbar-item is-1 ${this.state.isTop ? 'has-text-white' : ''}`}>
          <CategoryFilter />
        </div>
      )
    }
  }

  getLoginOrProfileNav() {
    if (this.props.user.authenticated) {
      return (
        <>
          <NavLink
            className={`navbar-item ${this.state.isTop && !this.isSearchActive() ? 'has-text-white' : ''}`}
            activeClassName={'is-active'}
            to={'/profile'}
          >
            {this.props.user.displayName}
          </NavLink>
          <NavLink
            className={`navbar-item ${this.state.isTop && !this.isSearchActive() ? 'has-text-white' : ''}`}
            // activeClassName={'is-active'}
            to={'/logout'}
          >
            Logout
          </NavLink>
        </>
      )
    } else {
      return (
        <NavLink
          className={`navbar-item ${this.state.isTop && !this.isSearchActive() ? 'has-text-white' : ''}`}
          // activeClassName={'is-active'}
          to={'/login'}
        >
          Login
        </NavLink>
      )
    }
  }

  getHeaderLogo() {
    return this.state.isTop && !this.isSearchActive() ? brandLogoWhite : brandLogoBlue
  }

  handleScroll(e) {
    this.setState({
      ...this.state,
      isTop: document.scrollingElement.scrollTop < this.element.clientHeight,
    })
  }

  isSearchActive() {
    return this.props.location.pathname.endsWith('/search')
  }
}

const mapStateToProps = state => ({
  user: state.appState.user,
})

const mapDispatchToProps = dispatch => ({
  loadProfile: () => dispatch(loadUserProfile()),
})

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation)

export default withRouter(ConnectedNavigation)
