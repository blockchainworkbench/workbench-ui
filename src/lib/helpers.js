import axios from 'axios'
import shajs from 'sha.js'

export const getDifficultyColorForTag = difficulty => {
  switch (difficulty) {
    case 'easy':
      return 'is-success'
    case 'medium':
      return 'is-warning'
    case 'hard':
      return 'is-danger'
    case 'all':
    default:
      return 'is-light'
  }
}

export const urlify = stringValue => {
  if (stringValue) return stringValue.split(' ').join('_')
  console.log('warning: undefined value in urlify')
  return 'undefined'
}

export const deurlify = stringValue => {
  if (!stringValue) return 'undefined'
  return stringValue.split('_').join(' ')
}

export const makePascalCase = stringValue => {
  if (!stringValue) return 'undefined'
  return stringValue.charAt(0).toUpperCase() + stringValue.substr(1)
}
export const buildPageUrl = (categoryName, pageTitle) => {
  return `/pages/${urlify(categoryName)}/${urlify(pageTitle)}`
}

export const buildCategoryUrl = categoryName => {
  return `/pages/${urlify(categoryName)}`
}

export const firstCategoryNameOrUnknown = categoryArray => {
  if (categoryArray && categoryArray.length > 0) {
    return categoryArray[0]
  } else return 'Unknown'
}

export const fetchUrl = url => {
  return axios({
    method: 'get',
    url: url,
  })
}

export const postUrl = (url, data) => {
  return axios({ method: 'post', url: url, data: data })
}

export const getAdjacentCategoryPage = (page, category, pages, nextPreviousContainer) => {
  if (nextPreviousContainer && category) {
    const categoryIndex = page.categories.map(cat => urlify(cat.toLowerCase())).indexOf(category.toLowerCase())
    if (categoryIndex !== -1) {
      return pages.find(
        page =>
          nextPreviousContainer[categoryIndex] &&
          page.url.toLowerCase() === nextPreviousContainer[categoryIndex].toLowerCase(),
      )
    }
  }
  return null
}

export const getPreviousPageData = (page, category, pages) => {
  const previousPage = page ? getAdjacentCategoryPage(page, category, pages, page.previous) : null

  let url
  let text
  if (!previousPage) {
    return {
      url: '/',
      text: 'Homepage',
    }
  }
  text = previousPage.title

  const sameCategory =
    previousPage &&
    previousPage.categories &&
    previousPage.categories.map(c => urlify(c.toLowerCase())).includes(category.toLowerCase())

  if (sameCategory) {
    if (previousPage.url.endsWith('/')) {
      // Chapter overview
      url = buildCategoryUrl(category)
    } else {
      // Regular page
      url = buildPageUrl(category, previousPage.title)
    }
  } else {
    // Previous Chapter
    url = buildPageUrl(firstCategoryNameOrUnknown(previousPage.categories), previousPage.title)
  }

  return { url, text }
}

export const getNextPageData = (page, category, pages) => {
  const nextPage = page ? getAdjacentCategoryPage(page, category, pages, page.next) : null

  let url
  let text
  if (!nextPage || !nextPage.categories) {
    // Search page
    url = '/search'
    text = 'Choose next page'
  } else if (nextPage.categories && nextPage.categories.map(c => c.toLowerCase()).includes(category.toLowerCase())) {
    // Next Page
    url = buildPageUrl(category, nextPage.title)
    text = nextPage.title
  } else if (nextPage.url.endsWith('/')) {
    // Next Chapter
    url = buildCategoryUrl(nextPage.categories[0])
    text = nextPage.title
  } else {
    // Next Chapter
    url = buildPageUrl(nextPage.categories[0], nextPage.title)
    text = nextPage.title
  }

  return { url, text }
}

export const getSHA256 = payload => {
  return shajs('sha256')
    .update(JSON.stringify(payload))
    .digest('hex')
}
