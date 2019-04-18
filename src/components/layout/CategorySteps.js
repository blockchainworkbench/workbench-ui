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

    for (const page of pages) {
      const isOverview = page.url.endsWith('/')
      const title = isOverview ? 'Overview' : page.title
      const url = `/pages/${category}` + (!isOverview ? `/${urlify(title)}` : '')

      steps.push(
        <li key={page.url} className={`steps-segment ${this.isActivePage(page, isOverview) ? 'is-active' : ''}`}>
          <Link to={url}>
            <span className="steps-marker">
              {isOverview ? (
                <span className="icon">
                  <i className="fa fa-circle is-size-7" />
                </span>
              ) : null}
            </span>
            <div className="steps-content">
              <p className="is-size-7">{title}</p>
            </div>
          </Link>
        </li>,
      )
    }
    return steps
  }

  render() {
    let activeCategoryName = this.props.match.params.category
    const activeCategoryPages = this.props.categories[urlify(activeCategoryName.toLowerCase())]
    return (
      <ul className="steps my-step-style has-content-centered is-hidden-mobile is-small">
        {this.getStepsForPages(activeCategoryName, activeCategoryPages)}
      </ul>
    )
  }

  isActivePage(page, isOverview) {
    return (
      (isOverview && !this.props.match.params.page) ||
      (this.props.match.params.page && this.props.match.params.page.toLowerCase() === urlify(page.title.toLowerCase()))
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
})

const ConnectedCategorySteps = connect(mapStateToProps)(CategorySteps)
export default withRouter(ConnectedCategorySteps)
