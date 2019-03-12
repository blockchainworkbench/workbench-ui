import React from 'react';
import {connect} from 'react-redux';
import {CATEGORY_FILTER_TYPE} from '../../actions/search';
import {addCategoryFilter, changeCategoryFilterType, removeCategoryFilter} from "../../actions/search";

class CategoryFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {catFilterName: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getClassesForCategoryFilterTypeButton(filterType) {
        return `button is-small
        ${this.props.categoryFilterType === filterType ? ` is-success is-active is-focused` : ''}`;
    }

    getAvailableCategoryList() {
        if (this.props.availableCategories.length > 0) {
            return (
                <p className='has-text-grey-light'>
                    <span className='float-left mr10'>Available Categories</span>
                    <span className='tags'>
                    {this.props.availableCategories.map(
                        cat => <span key={cat}
                                     onClick={() => this.handleCategoryClick(cat)}
                                     className='tag catItem catLink'>{cat}</span>)}
                     </span>
                </p>);
        } else {
            return <p>&nbsp;</p>
        }
    }

    render() {
        return (
            <div>
                <div className='is-pulled-left'>{this.getAvailableCategoryList()}</div>
                <div className='clearBoth'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='field has-addons'>
                            <p className='control  is-expanded'>
                                <input className="input is-large has-text-centered"
                                       type="text"
                                       id='catFilterName'
                                       value={this.state.catFilterName} onChange={this.handleChange}
                                       placeholder="search terms"/>
                            </p>
                            <p className='control'>
                                <button type='submit' className='button is-large'>Add</button>
                            </p>
                        </div>
                    </form>
                </div>
                <div className='level mb30 mt10'>
                    <div className="level-left">
                        <div className='tags'>{this.props.categoryFilter.map((cat, idx) =>
                            <span key={idx} className='tag catItem is-link'>{cat}
                                <button className='delete is-small'
                                        onClick={() => this.props.removeCategoryFilter(cat)}/>
                                </span>
                        )}</div>
                    </div>
                    {this.getCategoryFilterTypeJSX()}
                </div>
            </div>
        )
    }

    getCategoryFilterTypeJSX() {
        return (
            this.props.categoryFilter.length >= 2 ?
                <div className='is-flex level-right'>
                    <span className='has-text-grey-light mr10'>combine category filters with </span>
                    <span className='buttons has-addons'>
                    <button className={this.getClassesForCategoryFilterTypeButton(CATEGORY_FILTER_TYPE.AND)}
                            onClick={() => this.handleTypeButtonClick(CATEGORY_FILTER_TYPE.AND)}>
                        <span>AND</span>
                    </button>
                    <button className={this.getClassesForCategoryFilterTypeButton(CATEGORY_FILTER_TYPE.OR)}
                            onClick={() => this.handleTypeButtonClick(CATEGORY_FILTER_TYPE.OR)}>
                        <span>OR</span>
                    </button>
                </span>
                </div>
                : null);
    }

    handleChange(event) {
        const newValue = event.target.value;
        const newValueTrimmed = newValue.trim();
        const oldValue = this.state[event.target.id];

        if (newValueTrimmed !== oldValue) {
            this.props.removeCategoryFilter(oldValue);
        }
        if (newValue !== "" && this.props.categoryFilter.find(cat => cat === newValueTrimmed) === undefined) {
            this.props.addCategoryFilter(newValue);
        }
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({catFilterName: ""});
    }

    handleCategoryClick(catName) {
        this.props.addCategoryFilter(catName);
    }

    handleTypeButtonClick(filter_type) {
        this.props.changeCategoryFilterType(filter_type);
    }
}

const mapStateToProps = state => {
    return {
        categoryFilter: state.userSettings.categoryFilter,
        categoryFilterType: state.userSettings.categoryFilterType,
        availableCategories: getAvailableCategories(state.pages, state.userSettings.categoryFilter)
    };
};
const getAvailableCategories = (pages, activeCategories) => {
    const categories = [];
    for (const page of pages) {
        for (const cat of page.categories) {
            if (categories.indexOf(cat) === -1 && activeCategories.indexOf(cat) === -1) {
                categories.push(cat);
            }
        }
    }
    return categories;
};

const mapDispatchToProps = dispatch => {
    return {
        addCategoryFilter: filter => dispatch(addCategoryFilter(filter)),
        removeCategoryFilter: filter => dispatch(removeCategoryFilter(filter)),
        changeCategoryFilterType: filter_type => dispatch(changeCategoryFilterType(filter_type))
    }
};

const ConnectedCategoryFilter = connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
export default ConnectedCategoryFilter;
