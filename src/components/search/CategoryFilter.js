import React from 'react'
import { connect } from 'react-redux'
import {
  CATEGORY_FILTER_TYPE,
  addCategoryFilter,
  changeCategoryFilterType,
  removeCategoryFilter,
} from '../../actions/search'

class CategoryFilter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { catFilterName: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getClassesForCategoryFilterTypeButton(filterType) {
    return `button is-small
        ${this.props.categoryFilterType === filterType ? ` is-success is-active is-focused` : ''}`
  }

  getAvailableCategoryList() {
    if (this.props.availableCategories.length > 0) {
      const catList = this.props.availableCategories.map(cat => {
        return (
          <span key={cat} onClick={() => this.handleCategoryClick(cat)} className="tag catItem catLink">
            {cat}
          </span>
        )
      })
      return (
        <p className="has-text-grey-light">
          <span className="float-left mr10">Available Categories</span>
          <span className="tags">{catList}</span>
        </p>
      )
    } else {
      return <p>&nbsp;</p>
    }
  }

  render() {
    const categoryFilter = this.props.categoryFilter.map((cat, idx) => {
      return (
        <span key={idx} className="tag catItem is-link">
          {cat}
          <button className="delete is-small" onClick={() => this.props.removeCategoryFilter(cat)} />
        </span>
      )
    })
    return (
      <div>
        <div className="is-pulled-left">{this.getAvailableCategoryList()}</div>
        <div className="clearBoth">
          <form onSubmit={this.handleSubmit}>
            <div className="field has-addons">
              <p className="control  is-expanded">
                <input
                  className="input is-large has-text-centered"
                  type="text"
                  id="catFilterName"
                  value={this.state.catFilterName}
                  onChange={this.handleChange}
                  placeholder="search terms"
                />
                <p className="control">
                  <button type="submit" className="button is-large">
                    Add
                  </button>
                </p>
              </p>
            </div>
          </form>
        </div>
        <div className="level mb30 mt10">
          <div className="level-left">
            <div className="tags">{categoryFilter}</div>
          </div>
          {this.getCategoryFilterTypeJSX()}
        </div>
      </div>
    )
  }

  getCategoryFilterTypeJSX() {
    return this.props.categoryFilter.length >= 2 ? (
      <div className="is-flex level-right">
        <span className="has-text-grey-light mr10">combine category filters with </span>
        <span className="buttons has-addons">
          <button
            className={this.getClassesForCategoryFilterTypeButton(CATEGORY_FILTER_TYPE.AND)}
            onClick={() => this.handleTypeButtonClick(CATEGORY_FILTER_TYPE.AND)}
          >
            <span>AND</span>
          </button>
          <button
            className={this.getClassesForCategoryFilterTypeButton(CATEGORY_FILTER_TYPE.OR)}
            onClick={() => this.handleTypeButtonClick(CATEGORY_FILTER_TYPE.OR)}
          >
            <span>OR</span>
          </button>
        </span>
      </div>
    ) : null
  }

  handleChange(event) {
    const newValue = event.target.value
    const newValueTrimmed = newValue.trim()
    const oldValue = this.state[event.target.id]

    if (newValueTrimmed !== oldValue) {
      this.props.removeCategoryFilter(oldValue)
    }
    if (newValue !== '' && this.props.categoryFilter.find(cat => cat === newValueTrimmed) === undefined) {
      this.props.addCategoryFilter(newValue)
    }
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({ catFilterName: '' })
  }

  handleCategoryClick(catName) {
    this.props.addCategoryFilter(catName)
  }

  handleTypeButtonClick(filterType) {
    this.props.changeCategoryFilterType(filterType)
  }
}

const mapStateToProps = state => {
  return {
    categoryFilter: state.userSettings.categoryFilter,
    categoryFilterType: state.userSettings.categoryFilterType,
    availableCategories: getAvailableCategories(state.pages, state.userSettings.categoryFilter),
  }
}
const getAvailableCategories = (pages, activeCategories) => {
  const categories = []
  for (const page of pages) {
    if (page.categories) {
      for (const cat of page.categories) {
        if (categories.indexOf(cat) === -1 && activeCategories.indexOf(cat) === -1) {
          categories.push(cat)
        }
      }
    }
  }
  return categories
}

const mapDispatchToProps = dispatch => {
  return {
    addCategoryFilter: filter => dispatch(addCategoryFilter(filter)),
    removeCategoryFilter: filter => dispatch(removeCategoryFilter(filter)),
    changeCategoryFilterType: filterType => dispatch(changeCategoryFilterType(filterType)),
  }
}

const ConnectedCategoryFilter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryFilter)
export default ConnectedCategoryFilter
