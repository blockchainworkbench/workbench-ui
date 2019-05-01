import React from 'react'
import { withRouter } from 'react-router-dom'
import DifficultyFilter from './DifficultyFilter'
import SearchFilter from './SearchFilter'
import PageList from './PageList'

class Search extends React.Component {
  render() {
    return (
      <section className="section" id={'advanced'}>
        <div className={'search-top-bar columns is-flex is-vcentered is-justified'}>
          <a href={'http://'} onClick={this.props.history.goBack}>
            <h3 className="is-3">
              <span className={'icon'}>
                <i className={'fas fa-chevron-left'} />
              </span>
              <span>Back</span>
            </h3>
          </a>
          <div className={'filters is-flex'}>
            <SearchFilter />
            <DifficultyFilter />
          </div>
        </div>
        <PageList />
      </section>
    )
  }
}

export default withRouter(Search)
