import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import TitleHeader from '../layout/TitleHeader'
import CategorySteps from './CategorySteps'
import CategorySidebar from '../layout/CategorySidebar'
import connect from 'react-redux/es/connect/connect'
import { buildCategoryUrl, urlify } from '../../lib/helpers'
import PageContent from './PageContent'

class Page extends React.Component {
  getSelectedPage() {
    const activePage = this.props.match.params.page
    for (const page of this.props.pages) {
      if (urlify(page.title).toLowerCase() === activePage.toLowerCase()) {
        return page
      }
    }
  }

  render() {
    const page = this.getSelectedPage()
    const categoryName = this.props.match.params.category
    if (page && page.url && page.url.endsWith('/')) {
      return <Redirect to={buildCategoryUrl(categoryName)} />
    }
    return (
      <section className="hero mb2">
        <TitleHeader page={page} category={categoryName} />
        <div className="hero-body content">
          <CategorySteps url={categoryName + (page && page.url ? page.url : '')} />
          <div className="columns">
            <div className={'column'}>
              <PageContent page={page} category={categoryName} />
            </div>
            <div className={'column is-one-quarter'}>
              <CategorySidebar />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return { pages: state.pages }
}

const ConnectedPage = connect(mapStateToProps)(Page)
export default withRouter(ConnectedPage)
