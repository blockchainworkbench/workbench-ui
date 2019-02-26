import {put, takeLatest} from 'redux-saga/effects';
import {loadPagesSuccessSorted} from '../actions';

const pagesSorted = [
    takeLatest("LOAD_PAGES_SUCCESS", workerOrderPages)
];

export default pagesSorted;

function addToContainerIfNotYetExist(categoryName, container, page, containerType) {
    if(categoryName.toLowerCase() in container) {
        console.log(`More than one ${containerType} page for category ${categoryName} found`);
    } else {
        container[categoryName.toLowerCase()] = page;
    }
    return container;
}

function* workerOrderPages(action) {
    try {
        const pages = action.pages;
        // const categories = _.compact(_.uniq(pages.reduce((acc, page) => acc.concat(page.categories), [])));
        const pagesByKey = pages.reduce((acc, page) => {
            acc[page.url] = page;
            return acc;
        }, {});

        let categoryRoots = [];
        let categoryEnds = [];
        for (const page of pages) {
            for (const categoryIndex in page.categories) {
                let nextPage = null;
                let prevPage = null;
                let currentyCategory = page.categories[categoryIndex];
                if (page.next && page.next[categoryIndex]) {
                    nextPage = pagesByKey[page.next[categoryIndex]];
                    if (!nextPage.categories || !nextPage.categories.includes(currentyCategory)) {
                        categoryEnds = addToContainerIfNotYetExist(currentyCategory, categoryEnds, page, "end");
                    }
                } else {
                    categoryEnds = addToContainerIfNotYetExist(currentyCategory, categoryEnds, page, "end");
                }
                if (!page.previous || !page.previous[categoryIndex]){
                    categoryRoots = addToContainerIfNotYetExist(currentyCategory, categoryRoots, page, "root");
                } else {
                    prevPage = pagesByKey[page.previous[categoryIndex]];
                    if (!prevPage.categories || !prevPage.categories.includes(currentyCategory)) {
                        categoryRoots = addToContainerIfNotYetExist(currentyCategory, categoryRoots, page, "root");
                    }
                }
            }
        }

        const categoryMap = [];
        for (const category in categoryRoots) {
            const orderedCategoryPages = [];
            let current = categoryRoots[category];
            if (!(category in categoryEnds)) {
                console.log(category, 'not in cat ends');
            }
            let endPageUrl = categoryEnds[category].url;
            while (current) {
                const currentCategoryIndex = current.categories.map(c => c.toLowerCase()).indexOf(category);
                orderedCategoryPages.push(current);
                if (current.next && current.next[currentCategoryIndex] && current.url !== endPageUrl) {
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
