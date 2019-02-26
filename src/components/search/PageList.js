import React from 'react';
import PageListItem from './PageListItem';
import {connect} from 'react-redux';
import {CATEGORY_FILTER_TYPE, DIFFICULTY} from '../../actions';

class PageList extends React.Component {
    render() {
        const content = this.props.pages.map(page => <PageListItem key={page.url} page={page}/>);
        if (this.props.pages.length === 0) {
            content.push(<div key='no-data' className="tile is-parent column has-text-grey-light">
                No pages for the selected categories found</div>);
        }
        return (<div className='tile is-ancestor columns is-multiline'>{content}</div>);
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
        if (!candidates.find(candidate => page.url === candidate.url)) {
            candidates.push(page);
        }
    }
    return candidates;
};

const getFilteredCategoryPages = (pages, category) => {
    return pages.filter(page => page.categories.indexOf(category) !== -1);
};

const getPagesWithoutIndex = (pages) => {
    return pages.filter(page => !page.url.endsWith('index.html'));
};

const getVisiblePages = (pages, difficulty, categories, categoryFilterType) => {
    const pagesWithoutIndex = getPagesWithoutIndex(pages);
    const filteredDifficulty = getVisiblePagesByDifficulty(pagesWithoutIndex, difficulty);
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


const ConnectedTopicList = connect(mapStateToProps)(PageList);
export default ConnectedTopicList;
