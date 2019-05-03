import React from 'react'
import { deurlify, makePascalCase } from '../../lib/helpers'

export default class TitleHeader extends React.Component {
  static getStaticTitleHeader() {
    return (
      <section className="hero is-info">
        <div className="title-header hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-1">Blockchain Workbench</h1>
          </div>
        </div>
      </section>
    )
  }

  getPageDurationText() {
    return `${this.props.page.duration || 5} Min`
  }

  render() {
    if (!this.props.page || !this.props.category) {
      return TitleHeader.getStaticTitleHeader()
    }

    return (
      <section className="hero is-info">
        <div className="page-header hero-body">
          <div className="container has-text-centered page-header-title">
            <p>
              <a href={'http://'}>Courses</a> &#x203A; <a href={'http://'}>{deurlify(this.props.category)}</a>
            </p>
            <h1 className="title is-1">{this.props.page.title}</h1>
          </div>
          <div className={'level page-header-info'}>
            <div className={'level-left'}>
              <div className={'page-header-info-item'}>
                <span className="icon">
                  <i className="fas fa-signal" />
                </span>
                <div className={'page-header-info-item-text'}>{makePascalCase(this.props.page.difficulty)}</div>
              </div>
              <div className={'page-header-info-item'}>
                <span className="icon">
                  <i className="fas fa-clock" />
                </span>
                <div className={'page-header-info-item-text'}>{this.getPageDurationText()}</div>
              </div>
            </div>

            <div className={'level-right'}>
              <div className={'page-header-info-item'}>
                <span className="icon">
                  <i className="fas fa-calendar-alt" />
                </span>
                <div className={'page-header-info-item-text'}>{this.props.page.updated_on}</div>
              </div>
              <div className={'page-header-info-item'}>
                <span className="icon">
                  <i className="fas fa-user" />
                </span>
                <div className={'page-header-info-item-text'}>{this.props.page.author || 'Unknown Author'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
