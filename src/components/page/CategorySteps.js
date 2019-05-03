import React from 'react'
import { withRouter } from 'react-router'
import connect from 'react-redux/es/connect/connect'
import { Link } from 'react-router-dom'
import { urlify } from '../../lib/helpers'

class CategorySteps extends React.Component {
  getStepsForPages(category, pages) {
    if (!pages) {
      return []
    }
    const steps = []

    for (const [idx, page] of pages.entries()) {
      const isOverview = page.url.endsWith('/')
      const title = isOverview ? 'Overview' : page.title
      const url = `/pages/${category}` + (!isOverview ? `/${urlify(title)}` : '')

      steps.push(
        <li title={title} key={page.url} className={this.getStepClasses(page, isOverview, idx)}>
          <Link to={url}>&nbsp;</Link>
        </li>,
      )
    }
    return steps
  }

  render() {
    let activeCategoryName = this.props.match.params.category
    const activeCategoryPages = this.props.categories[urlify(activeCategoryName.toLowerCase())]
    return (
      <ul id={'category-steps'} className="category-steps">
        {this.getStepsForPages(activeCategoryName, activeCategoryPages)}
      </ul>
    )
  }

  getStepClasses(page, isOverview, idx) {
    if (this.isActivePage(page, isOverview)) return 'is-active'
    if (this.isPageCompleted(page, idx)) return 'has-background-info'
    return 'has-background-grey-light'
  }

  isActivePage(page, isOverview) {
    return (
      (isOverview && !this.props.match.params.page) ||
      (this.props.match.params.page && this.props.match.params.page.toLowerCase() === urlify(page.title.toLowerCase()))
    )
  }

  isPageCompleted(page, idx) {
    // TODO : Real Implementation with request to API to check if user has already completed page
    if (idx < 2) return true
    return idx % 5 === 0
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
})

const ConnectedCategorySteps = connect(mapStateToProps)(CategorySteps)
export default withRouter(ConnectedCategorySteps)
