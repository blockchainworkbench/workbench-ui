import React from 'react';
import PageListItem from './PageListItem';
import {connect} from 'react-redux';
import {DIFFICULTY, CATEGORY_FILTER_TYPE, loadPages} from '../../actions';
import _ from 'lodash';

class PageList extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadPages();
    }

    render() {
        let content = [];
        const rows = _.chunk(this.props.pages, 3);
        for (let row of rows.entries()) {
            content.push(<div key={row[0]} className='tile is-ancestor'>
                {row[1].map(page => <PageListItem key={page.url} page={page}/>)}
            </div>);
        }
        return content;
    }
}
const getVisiblePagesByDifficulty = (pages, difficulty) => {
    let filteredPages = [...pages];
    if (difficulty !== DIFFICULTY.ALL) {
        filteredPages = filteredPages.filter(page => page.difficulty === difficulty);
    }
    return filteredPages;
};


const getVisiblePagesByCategories = (pages, categories, categoryFilterType) => {
    let filteredPages = [...pages];
    if (categories.length > 0) {
        if (categoryFilterType === CATEGORY_FILTER_TYPE.AND) {
            for (const category of categories) {
                filteredPages = [...getFilteredCategoryPages(filteredPages, category)];
            }
        } else if (categoryFilterType === CATEGORY_FILTER_TYPE.OR) {
            let candidates = [];
            for (const category of categories) {
                const categoryPages = getFilteredCategoryPages(filteredPages, category);
                candidates = mergePages(candidates, categoryPages);
            }
            filteredPages = candidates;
        }
    }
    return filteredPages;
};

const mergePages = (candidates, categoryPages) => {
    for (const page of categoryPages) {
        if (!candidates.find(candidate => page.id === candidate.id)) {
            candidates.push(page);
        }
    }
    return candidates;
};

const getFilteredCategoryPages = (pages, category) => {
    return pages.filter(page => page.categories.indexOf(category) !== -1);
};

const getVisiblePages = (pages, difficulty, categories, categoryFilterType) => {
    const filteredDifficulty = getVisiblePagesByDifficulty(pages, difficulty);
    return getVisiblePagesByCategories(filteredDifficulty, categories, categoryFilterType);
};

const mapStateToProps = state => {
    return {
        pages: getVisiblePages(state.pages,
            state.userSettings.difficultyFilter,
            state.userSettings.categoryFilter,
            state.userSettings.categoryFilterType)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadPages: () => dispatch(loadPages())
    };
};

const ConnectedTopicList = connect(mapStateToProps, mapDispatchToProps)(PageList);
export default ConnectedTopicList;