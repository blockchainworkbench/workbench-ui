import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {buildCategoryUrl, buildPageUrl} from '../../lib/helpers';
import {loadPageContent} from "../../actions/pages";
import ContentArray from "./ContentArray";

const ReactMarkdown = require('react-markdown');

class PageContent extends React.Component {

    componentDidMount() {
        this.loadCurrentPageContent();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadCurrentPageContent();
    }

    loadCurrentPageContent() {
        this.loadPageContent(this.props.page);
        if (this.props.page) {
            this.loadPageContent(this.getAdjacentCategoryPage(this.props.page.next));
            this.loadPageContent(this.getAdjacentCategoryPage(this.props.page.previous));
        }
    }

    loadPageContent(page) {
        if (page && !page.content && !page.loading && !page.error) {
            console.log(`Loading content for page ${page.title}`);
            this.props.loadPage(page.url);
        }
    }

    render() {
        if (this.props.page) {
            return (
                <div>
                    <div className="content">
                        {this.getPageContentJSX()}
                        <div className='level'>
                            <div className='level-left'>{this.getPreviousPageJSX()}</div>
                            <div className='level-left'>{this.getNextPageJSX()}</div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (<div>
                <h1 className="title has-text-centered">loading..</h1>
                <p className='icon loading has-text-info'><i className='fas fa-spinner fa-spin'/></p>
            </div>)
        }
    }

    getPageContentJSX() {
        if (this.props.page.content) {
            if (typeof (this.props.page.content) === 'string') {
                return <ReactMarkdown source={this.props.page.content}/>
            } else {
                return <div className="content-array mb30 has-text-left"><ContentArray
                    content={this.props.page.content}/></div>
            }
        } else {
            if (this.props.page.error) {
                return <p className='has-text-danger has-text-weight-bold'>{this.props.page.error}</p>;
            } else {
                return (<p className='has-text-centered'>
                <span className='icon loading has-text-info has-text-centered is-large'>
                    <i className='fas fa-spinner fa-spin'/>
                </span>
                    <span>Loading content ...</span>
                </p>)
            }
        }
    }

    getNextPageJSX() {
        const nextIcon = <p className='icon has-text-info'><i className='fas fa-chevron-circle-right'/></p>;
        const nextPage = this.props.page ? this.getAdjacentCategoryPage(this.props.page.next, 'next') : null;
        if (!nextPage || !nextPage.categories) {
            return <Link to='/#advanced'>Choose next Page {nextIcon}</Link>
        } else {
            const sameCategory = nextPage.categories
                && nextPage.categories.map(c => c.toLowerCase()).includes(this.props.category.toLowerCase());
            if (sameCategory) {
                return <Link to={buildPageUrl(this.props.category, nextPage.title)}>{nextPage.title} {nextIcon}</Link>
            } else {
                if (nextPage.url.endsWith('/')) {
                    return <Link to={buildCategoryUrl(nextPage.categories[0])} className='button is-info is-large'>Next
                        Chapter: {nextPage.title}</Link>
                } else {
                    return <Link to={buildPageUrl(nextPage.categories[0], nextPage.title)}
                                 className='button is-info is-large'>Next
                        Chapter: {nextPage.title}</Link>
                }
            }
        }
    }

    getPreviousPageJSX() {
        const previousIcon = <p className='icon has-text-info'><i className='fas fa-chevron-circle-left'/></p>;
        const previousPage = this.props.page ? this.getAdjacentCategoryPage(this.props.page.previous, 'prev') : null;
        const sameCategory = previousPage && previousPage.categories
            && previousPage.categories.map(c => c.toLowerCase()).includes(this.props.category.toLowerCase());
        if (previousPage) {
            if (sameCategory) {
                if (previousPage.url.endsWith('/')) {
                    return <Link to={buildCategoryUrl(this.props.category)}>{previousIcon} {previousPage.title} (Chapter
                        Overview)</Link>
                } else {
                    return <Link
                        to={buildPageUrl(this.props.category, previousPage.title)}>{previousIcon} {previousPage.title}</Link>
                }
            } else {
                return <Link
                    to={buildPageUrl(previousPage.categories[0], previousPage.title)}>{previousIcon} {previousPage.title} (Previous
                    Chapter)</Link>
            }
        }
        return previousPage
            ?
            <Link to={buildPageUrl(this.props.category, previousPage.title)}>{previousIcon} {previousPage.title}</Link>
            : null
    }

    getAdjacentCategoryPage(next_previous_container, info) {
        if (next_previous_container) {
            const categoryIndex = this.props.page.categories.map(cat => cat.toLowerCase()).indexOf(this.props.category.toLowerCase());
            if (categoryIndex !== -1) {
                return this.props.pages.find(page => page.url.toLowerCase() === next_previous_container[categoryIndex].toLowerCase());
            } else {
                if (info === 'next') {
                    console.log('-1 next', this.props.page.categories, this.props.category);
                }
            }
        }
    }
}

const mapStateToProps = state => {
    return {
        pages: state.pages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadPage: pageUrl => dispatch(loadPageContent(pageUrl))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageContent);
