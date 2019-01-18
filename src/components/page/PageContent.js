import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {buildPageUrl, buildCategoryUrl} from '../../lib/helpers';
import {loadPageContent} from "../../actions";

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
        if (page && !page.content && !page.loading) {
            console.log(`Loading content for page ${page.title}`);
            this.props.loadPage(page.url);
        }
    }

    render() {
        if (this.props.page) {
            return (
                <div>
                    <h1 className="title has-text-centered">{this.props.page.title}</h1>
                    <div className="content">
                        {this.props.page.content
                            ? <ReactMarkdown source={this.props.page.content}/>
                            : <p className='has-text-centered'>
                                <span className='icon loading has-text-info has-text-centered is-large'>
                                    <i className='fas fa-spinner fa-spin'/>
                                </span>
                                <span>Loading content ...</span>
                            </p>}
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

    getNextPageJSX() {
        const nextIcon = <p className='icon has-text-info'><i className='fas fa-chevron-circle-right'/></p>;
        const page = this.props.page ? this.getAdjacentCategoryPage(this.props.page.next) : null;

        return page
            ? <Link to={buildPageUrl(this.props.category, page.title)}>{page.title} {nextIcon}</Link>
            : <Link to={buildPageUrl(this.props.category, 'summary')}>Summary {nextIcon}</Link>
    }

    getPreviousPageJSX() {
        const previousIcon = <p className='icon has-text-info'><i className='fas fa-chevron-circle-left'/></p>;
        const page = this.props.page ? this.getAdjacentCategoryPage(this.props.page.previous) : null;

        return page
            ? <Link to={buildPageUrl(this.props.category, page.title)}>{previousIcon} {page.title}</Link>
            : <Link to={buildCategoryUrl(this.props.category)}>{previousIcon} Overview</Link>
    }

    getAdjacentCategoryPage(next_previous_container) {
        if (next_previous_container) {
            const categoryIndex = this.props.page.categories.indexOf(this.props.category);
            if (categoryIndex !== -1) {
                return this.props.pages.find(page => page.url === next_previous_container[categoryIndex]);
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