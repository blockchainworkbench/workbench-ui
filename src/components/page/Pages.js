import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import TitleHeader from '../layout/TitleHeader'
import { getDifficultyColorForTag, urlify } from '../../lib/helpers'
import CategorySidebar from '../layout/CategorySidebar'
import CategorySteps from '../layout/CategorySteps'
import PageContent from './PageContent'

class Pages extends React.Component {
  getTilesForPages(category, pages) {
    let tiles = []
    if (pages) {
      tiles = pages.map(page => {
        if (!page.url.endsWith('/')) {
          return (
            <div key={page.url} className="tile is-parent is-4 catLink column">
              <div className="tile is-child box">
                <Link to={`/pages/${category}/${urlify(page.title)}`}>
                  <p>
                    <span className="title is-4">{page.title}</span>
                    {page.difficulty ? (
                      <span className={`tag is-pulled-right ${getDifficultyColorForTag(page.difficulty)}`}>
                        {page.difficulty}
                      </span>
                    ) : null}
                  </p>
                  <p className="content" />
                  <p className="content tags">
                    {page.categories.map(category => (
                      <span key={category} className="tag catItem is-info">
                        {category}
                      </span>
                    ))}
                  </p>
                </Link>
              </div>
            </div>
          )
        } else {
          return null
        }
      })
    }
    return tiles
  }

  render() {
    const activeCategoryName = this.props.match.params.category
    const activeCategoryPages = this.props.categories[activeCategoryName.toLowerCase()]
    let content = null
    if (!this.props.categories || !activeCategoryPages || activeCategoryPages.length === 0) {
      content = this.getLoadingInfo()
    } else {
      content = this.getCategoryInfo(activeCategoryPages, activeCategoryName)
    }
    return (
      <section className={'hero'}>
        <TitleHeader />
        <div className={'hero-body content'}>
          <div>{content}</div>
        </div>
      </section>
    )
  }

  getCategoryInfo(categoryPages, categoryName) {
    const categoryRootPage = this.props.pages.find(page => page.url === categoryPages[0].url)
    return (
      <>
        <CategorySteps />
        <div className="columns">
          <div className={'column'}>
            <PageContent page={categoryRootPage} category={categoryName} categoryPage />
          </div>
          <div className={'column is-one-quarter'}>
            <CategorySidebar />
          </div>
        </div>
      </>
    )
  }

  getLoadingInfo() {
    if (this.categoriesLoaded()) {
      return <Redirect to={'/404'} />
    } else {
      return (
        <div>
          <h1 className="title has-text-centered">loading..</h1>
          <p className="icon loading has-text-info">
            <i className="fas fa-spinner fa-spin" />
          </p>
        </div>
      )
    }
  }

  categoriesLoaded() {
    return Object.keys(this.props.categories).length > 0
  }
}

const mapStateToProps = state => {
  return { categories: state.categories, pages: state.pages }
}

const ConnectedPages = connect(mapStateToProps)(Pages)
export default withRouter(ConnectedPages)
