import React from 'react'
import { buildCategoryUrl, buildPageUrl, getDifficultyColorForTag } from '../../lib/helpers'
import { Link } from 'react-router-dom'

class PageListItem extends React.Component {
  render() {
    const diffTileClass = `tag is-pulled-right ${getDifficultyColorForTag(this.props.page.difficulty)}`
    return (
      <div className="tile is-parent is-4 catLink column">
        <div className="tile is-child box">
          <Link to={this.getPageUrl()}>
            <p>
              <span className="title is-4">{this.props.page ? this.props.page.title : 'Page undefined'}</span>
              {this.props.page.difficulty ? <span className={diffTileClass}>{this.props.page.difficulty}</span> : null}
            </p>
            <p className="content">{this.props.page.description}</p>
            <p className="content tags">
              {this.props.page.categories.map((t, idx) => {
                return (
                  <span key={idx} className="tag catItem is-info">
                    {t}
                  </span>
                )
              })}
            </p>
          </Link>
        </div>
      </div>
    )
  }

  getPageUrl() {
    const firstCategory =
      this.props.page.categories && this.props.page.categories.length > 0 ? this.props.page.categories[0] : 'Unknown'
    if (this.props.page.url.endsWith('index.html')) {
      return buildCategoryUrl(firstCategory)
    } else {
      return buildPageUrl(firstCategory, this.props.page.title)
    }
  }
}

export default PageListItem
