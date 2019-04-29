import React from 'react'
import { connect } from 'react-redux'
import { removeCategoryFilter } from '../../actions/search'

class SearchFilter extends React.Component {
  render() {
    return (
      <div className="tags is-flex is-vcentered">
        {this.props.categoryFilter.map((cat, idx) => (
          <span key={idx} className="tag catItem is-info">
            {cat}
            <button className="delete is-small" onClick={() => this.props.removeCategoryFilter(cat)} />
          </span>
        ))}
      </div>
    )
  }
}

const getAvailableCategories = (pages, activeCategories) => {
  return pages
    .filter(page => page.categories) // pages included in a category
    .reduce(
      (acc, page) => [...acc, page.categories.filter(c => !(acc.includes(c) || activeCategories.includes(c)))],
      [],
    ) // list of all categories not already filtered
}

const mapStateToProps = state => ({
  categoryFilter: state.userSettings.categoryFilter,
  categoryFilterType: state.userSettings.categoryFilterType,
  availableCategories: getAvailableCategories(state.pages, state.userSettings.categoryFilter),
})

const mapDispatchToProps = dispatch => ({
  removeCategoryFilter: filter => dispatch(removeCategoryFilter(filter)),
})

const ConnectedSearchFilter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchFilter)
export default ConnectedSearchFilter
