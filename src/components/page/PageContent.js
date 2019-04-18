import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAdjacentCategoryPage, getNextPageData, getPreviousPageData } from '../../lib/helpers'
import { loadPageContent } from '../../actions/pages'
import ContentArray from './ContentArray'

const ReactMarkdown = require('react-markdown')

class PageContent extends React.Component {
  componentDidMount() {
    this.loadCurrentPageContent()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.loadCurrentPageContent()
  }

  loadCurrentPageContent() {
    this.loadPageContent(this.props.page)
    if (this.props.page) {
      this.loadPageContent(
        getAdjacentCategoryPage(this.props.page, this.props.category, this.props.pages, this.props.page.next),
      )
      this.loadPageContent(
        getAdjacentCategoryPage(this.props.page, this.props.category, this.props.pages, this.props.page.previous),
      )
    }
  }

  loadPageContent(page) {
    if (page && !page.content && !page.loading && !page.error) {
      console.log(`Loading content for page ${page.title}`)
      this.props.loadPage(page.url)
    }
  }

  render() {
    if (this.props.page) {
      return (
        <div>
          {this.getPageContentJSX()}
          <div className={'level'}>
            <div className={'level-left'}>{this.getPreviousPageJSX()}</div>
            <div className={'level-left'}>{this.getNextPageJSX()}</div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <h1 className="title has-text-centered">loading..</h1>
        <p className={'icon loading has-text-info'}>
          <i className={'fas fa-spinner fa-spin'} />
        </p>
      </div>
    )
  }

  getPageContentJSX() {
    if (this.props.page.content) {
      if (typeof this.props.page.content === 'string') {
        return <ReactMarkdown source={this.props.page.content} />
      }
      return (
        <div className="content-array mb30 has-text-left">
          <ContentArray content={this.props.page.content} />
        </div>
      )
    }
    if (this.props.page.error) {
      return <p className={'has-text-danger has-text-weight-bold'}>{this.props.page.error}</p>
    }
    return (
      <p className={'has-text-centered'}>
        <span className={'icon loading has-text-info has-text-centered is-large'}>
          <i className={'fas fa-spinner fa-spin'} />
        </span>
        <span>Loading content ...</span>
      </p>
    )
  }

  getNextPageJSX() {
    let { url, text } = getNextPageData(this.props.page, this.props.category, this.props.pages)

    return (
      <Link to={url} className={'button is-info is-outlined is-uppercase'}>
        <span>{text}</span>
        <div className={'icon'}>
          <i className={'fas fa-chevron-right'} />
        </div>
      </Link>
    )
  }

  getPreviousPageJSX() {
    const { url, text } = getPreviousPageData(this.props.page, this.props.category, this.props.pages)

    return (
      <Link to={url} className={'button is-info is-outlined is-uppercase'}>
        <div className={'icon'}>
          <i className={'fas fa-chevron-left'} />
        </div>
        <span>{text}</span>
      </Link>
    )
  }
}

const mapStateToProps = state => ({
  pages: state.pages,
})

const mapDispatchToProps = dispatch => ({
  loadPage: pageUrl => dispatch(loadPageContent(pageUrl)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageContent)
