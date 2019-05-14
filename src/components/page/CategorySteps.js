import React from 'react'
import { withRouter } from 'react-router'
import connect from 'react-redux/es/connect/connect'
import { Link } from 'react-router-dom'
import { urlify } from '../../lib/helpers'
import { checkPageStatus } from '../../actions/pages'

class CategorySteps extends React.Component {
  state = {
    checkedPages: false,
    url: '',
  }

  componentDidMount() {
    this.checkPagesStatus()
  }

  componentDidUpdate() {
    this.checkPagesStatus()
  }

  checkPagesStatus() {
    if (this.isLoggedIn() && this.didNotCheckStatusForCurrentPage()) {
      const categoryPages = this.getCategoryPages()
      if (categoryPages) {
        this.setState({ checkedPages: true, url: this.props.location.pathname })
        for (let page of categoryPages) {
          if (!this.isPageCompleted(page)) {
            this.props.checkPageStatus(page.url)
          }
        }
      }
    }
  }

  didNotCheckStatusForCurrentPage() {
    return !this.state.checkedPages || this.state.url !== this.props.location.pathname
  }

  isLoggedIn() {
    return this.props.user.authenticated
  }

  getStepsForPages() {
    if (!this.props.categories) return []
    const categoryPages = this.getCategoryPages()
    if (!categoryPages) return []
    const steps = []

    for (const page of categoryPages.values()) {
      const isOverview = page.url.endsWith('/')
      const title = isOverview ? 'Overview' : page.title
      const url = `/pages/${this.props.match.params.category}` + (!isOverview ? `/${urlify(title)}` : '')

      steps.push(
        <li title={title} key={page.url} className={this.getStepClasses(page, isOverview)}>
          <Link to={url}>&nbsp;</Link>
        </li>,
      )
    }
    return steps
  }

  render() {
    return <ul className="category-steps">{this.getStepsForPages()}</ul>
  }

  getCategoryPages() {
    return this.props.categories[urlify(this.props.match.params.category.toLowerCase())]
  }

  getStepClasses(page, isOverview) {
    if (this.isActivePage(page, isOverview)) return 'is-active'
    if (this.isPageCompleted(page)) return 'has-background-info'
    return 'has-background-grey-light'
  }

  isActivePage(page, isOverview) {
    return (
      (isOverview && !this.props.match.params.page) ||
      (this.props.match.params.page && this.props.match.params.page.toLowerCase() === urlify(page.title.toLowerCase()))
    )
  }

  isPageCompleted(page) {
    return this.props.completedPages.includes(page.url)
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  completedPages: state.progress.pages,
  user: state.appState.user,
})

const mapDispatchToProps = dispatch => ({
  checkPageStatus: pageUrl => dispatch(checkPageStatus(pageUrl)),
})

const ConnectedCategorySteps = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategorySteps)
export default withRouter(ConnectedCategorySteps)
