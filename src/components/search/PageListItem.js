import React from 'react'
import { buildCategoryUrl, buildPageUrl, firstCategoryNameOrUnknown } from '../../lib/helpers'
import { Link } from 'react-router-dom'

class PageListItem extends React.Component {
  render() {
    if (this.props.page && this.props.page.rootOfCategory) {
      return this.getCategoryItem()
    }

    const title = this.props.page ? this.props.page.title : 'Page undefined'
    const difficulty = this.props.page.difficulty
    const time = '5 min'
    const categories = this.props.page.categories
    return (
      <Link to={this.getPageUrl()} className={'is-6 column'}>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{title}</p>
          </header>
          <div className="card-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          </div>
          <footer className="card-footer has-background-light-info">
            <div className={'is-left'}>
              {categories
                ? categories.map((t, idx) => {
                    return (
                      <span key={idx} className="tag has-background-transparent has-text-white">
                        {t}
                      </span>
                    )
                  })
                : null}
            </div>
            <div className={'is-right'}>
              <div className={'difficulty tag has-background-transparent has-text-white'}>
                <span className={'icon'}>
                  <i className={'fas fa-signal'} />
                </span>
                <span>{difficulty}</span>
              </div>
              <div className={'time tag has-background-transparent has-text-white'}>
                <span className={'icon'}>
                  <i className={'fas fa-clock'} />
                </span>
                <span>{time}</span>
              </div>
            </div>
          </footer>
        </div>
      </Link>
    )
  }

  getCategoryItem() {
    const title = this.props.page.rootOfCategory
    const difficulty = 'medium' // TODO: This should be the minimum course level
    const time = '1 h' // TODO: This should be the sum of time in this category
    return (
      <Link to={this.getPageUrl()} className={'is-6 column'}>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title is-capitalized">{title}</p>
          </header>
          <div className="card-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
          </div>
          <footer className="card-footer has-background-light-info">
            <div className={'is-left'}>
              <span className="tag has-background-transparent has-text-white">
                Category (could be paths included in)
              </span>
            </div>
            <div className={'is-right'}>
              <div className={'difficulty tag has-background-transparent has-text-white'}>
                <span className={'icon'}>
                  <i className={'fas fa-signal'} />
                </span>
                <span>{difficulty}</span>
              </div>
              <div className={'time tag has-background-transparent has-text-white'}>
                <span className={'icon'}>
                  <i className={'fas fa-clock'} />
                </span>
                <span>{time}</span>
              </div>
            </div>
          </footer>
        </div>
      </Link>
    )
  }

  getPageUrl() {
    const firstCategory = firstCategoryNameOrUnknown(this.props.page.categories)
    if (this.props.page.url.endsWith('/')) {
      return buildCategoryUrl(firstCategory)
    } else {
      return buildPageUrl(firstCategory, this.props.page.title)
    }
  }
}

export default PageListItem
