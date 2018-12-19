import {put, takeLatest} from 'redux-saga/effects';
import {loadPagesSuccessSorted} from '../actions';

const pagesSorted = [
    takeLatest("LOAD_PAGES_SUCCESS", workerOrderPages)
];

export default pagesSorted;

function* workerOrderPages(action) {
    try {
        const pages = action.pages;
        const categories = [];
        const pagesByKey = [];

        const categoryRoots = [];
        for (const page of pages) {
            for (const categoryIndex in page.categories) {
                if (categories.indexOf(page.categories[categoryIndex]) === -1) {
                    categories.push(page.categories[categoryIndex]);
                }
                // finding root page for each category
                if (page.next && page.next[categoryIndex] && (!page.previous || !page.previous[categoryIndex])) {
                    if (page.categories[categoryIndex] in categoryRoots) {
                        console.log(`More than one root page for category '${page.categories[categoryIndex]} found!'`);
                        // TODO : Handle case of multiple root pages for one category
                    } else {
                        categoryRoots[page.categories[categoryIndex]] = page;
                    }
                }
            }
            pagesByKey[page.url] = page;
        }

        const categoryMap = [];
        for (const category in categoryRoots) {
            const orderedCategoryPages = [];
            let current = categoryRoots[category];
            while (current) {
                const currentCategoryIndex = current.categories.indexOf(category);
                orderedCategoryPages.push(current);
                if (current.next && current.next[currentCategoryIndex]) {
                    current = pagesByKey[current.next[currentCategoryIndex]];
                } else {
                    current = null;
                }
            }
            categoryMap[category] = orderedCategoryPages;
        }
        yield put(loadPagesSuccessSorted(categoryMap));
    } catch (error) {
        console.log('error in workerOrderPages', error);
    }
}