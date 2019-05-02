import React from 'react'
import { deurlify, makePascalCase } from '../../lib/helpers'

function getStaticTitleHeader() {
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

export default function TitleHeader(props) {
  if (!props.page || !props.category) {
    return getStaticTitleHeader()
  }
  return (
    <section className="hero is-info">
      <div className="title-header hero-body">
        <div className="container has-text-centered">
          <p>
            <a href={'http://'}>Courses</a> &#x203A; <a href="#">{deurlify(props.category)}</a>
          </p>
          <h1 className="title is-1">{props.page.title}</h1>
        </div>
        <div className={'level header-pageinfo'}>
          <div className={'level-left'}>
            <div>
              <span className="icon">
                <i className="fas fa-signal" />
              </span>
              <div>{makePascalCase(props.page.difficulty)}</div>
            </div>
            <div>
              <span className="icon">
                <i className="fas fa-clock" />
              </span>
              <div>{props.page.duration || 5} Min</div>
            </div>
          </div>

          <div className={'level-right'}>
            <div>
              <span className="icon">
                <i className="fas fa-calendar-alt" />
              </span>
              <div>{props.page.updated_on}</div>
            </div>
            <div>
              <span className="icon">
                <i className="fas fa-user" />
              </span>
              <div>{props.page.author || 'Unknown Author'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
