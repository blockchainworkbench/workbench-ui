import React from 'react'
import { withRouter } from 'react-router-dom'
import Search from './SearchComponent'

class SearchPage extends React.Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <Search />
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(SearchPage)
