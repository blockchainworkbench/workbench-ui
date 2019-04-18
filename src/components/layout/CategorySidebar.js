import React from 'react'
import { withRouter } from 'react-router'
import connect from 'react-redux/es/connect/connect'
import { Link } from 'react-router-dom'
import { getNextPageData, getPreviousPageData, urlify } from '../../lib/helpers'

class CategorySidebar extends React.Component {
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
        <li key={page.url}>
          <Link to={url} className={`text ${this.isActivePage(page, isOverview) ? 'is-active' : ''}`}>
            {title}
          </Link>
        </li>,
      )
    }
    return steps
  }

  render() {
    const activeCategoryName = this.props.match.params.category
    const activeCategoryPages = this.props.categories[urlify(activeCategoryName.toLowerCase())]
    const activePage = this.getCurrentPage()

    const pages = Object.values(this.props.categories).reduce((acc, cat) => [...acc, ...cat], [])
    const previousData = getPreviousPageData(activePage, activeCategoryName, pages)
    const nextData = getNextPageData(activePage, activeCategoryName, pages)

    return (
      <div className={'category-sidebar border-shadow'}>
        <div className={'sidebar-header is-flex is-stretch has-text-centered'}>
          <Link to={previousData.url} className={'icon has-text-white has-background-info plr1'}>
            <i className={'fas fa-chevron-left'} />
          </Link>
          <div className={'is-3 has-text-white has-text-weight-bold has-flex-grow has-background-info pbt05 plr075'}>
            {activeCategoryName.replace(/_/g, ' ')}
          </div>
          <Link to={nextData.url} className={'icon has-text-white has-background-info plr1'}>
            <i className={'fas fa-chevron-right'} />
          </Link>
        </div>
        <aside className="menu">
          <ul className="menu-list pbt5">{this.getStepsForPages(activeCategoryName, activeCategoryPages)}</ul>
        </aside>
      </div>
    )
  }

  getCurrentPage() {
    let category = this.props.match.params.category
    const pages = this.props.categories[urlify(category).toLowerCase()]

    if (!pages) {
      return null
    }
    if (!this.props.match.params.page) {
      return pages[0]
    }

    return pages.find(page => urlify(page.title).toLowerCase() === this.props.match.params.page.toLowerCase())
  }

  isActivePage(page, isOverview) {
    return (
      (isOverview && !this.getCurrentPage()) || (this.getCurrentPage() && this.getCurrentPage().title === page.title)
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
})

const ConnectedCategorySidebar = connect(mapStateToProps)(CategorySidebar)
export default withRouter(ConnectedCategorySidebar)
