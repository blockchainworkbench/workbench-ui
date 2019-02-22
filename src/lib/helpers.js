import axios from "axios";

export const getDifficultyColorForTag = (difficulty) => {
    switch (difficulty) {
        case "easy":
            return "is-success";
        case "medium":
            return "is-warning";
        case "hard":
            return "is-danger";
        case "all":
        default:
            return "is-light"
    }
};

export const urlify = (string_value) => {
    return string_value.split(' ').join('_').toLowerCase();
};

export const buildPageUrl = (categoryName, pageTitle) => {
    return `/pages/${urlify(categoryName)}/${urlify(pageTitle)}`;
};

export const buildCategoryUrl = (categoryName) => {
    return `/pages/${urlify(categoryName)}`;
};

export const fetchUrl = (url) => {
    return axios({
        method: "get", url: url
    });
};

export const postUrl = (url, data) => {
  return axios({ method: "post", url: url, data: data});
};
