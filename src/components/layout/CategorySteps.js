import React from 'react';
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import {Link} from "react-router-dom";
import {urlify} from "../../lib/helpers";

class CategorySteps extends React.Component {

    getStepsForPages(category, pages) {
        const steps = [];
        if (pages) {
            for (const page of pages) {
                if (page.url.endsWith('index.html')) {
                    steps.push(this.getOverviewStep(category));
                } else {
                steps.push(<li key={page.url}
                               className={`steps-segment ${this.props.match.params.page && this.props.match.params.page.toLowerCase() === urlify(page.title.toLowerCase())
                                   ? 'is-active' : ''}`}>
                    <Link to={`/pages/${category}/${urlify(page.title)}`}>
                        <span className="steps-marker"/>
                        <div className="steps-content">
                            <p className="is-size-7">{page.title}</p>
                        </div>
                    </Link>
                </li>)}
            }
        }
        return steps;
    }

    getOverviewStep(categoryName) {
        return (<li key='overview' className={`steps-segment ${!this.props.match.params.page ? 'is-active' : ''}`}>
            <Link to={`/pages/${categoryName}`}>
                <span className="steps-marker">
                    <span className="icon"><i className="fa fa-circle is-size-7"/></span>
                </span>
                <div className="steps-content"><p className="is-size-7">Overview</p></div>
            </Link>
        </li>)
    }

    getSummaryStep(categoryName) {
        return (<li className={`steps-segment ${this.props.match.params.page === 'summary' ? 'is-active' : ''}`}>
            <Link to={`/pages/${categoryName}/summary`}>
                <span className="steps-marker">
                    <span className="icon"><i className="fa fa-check is-size-7"/></span>
                </span>
                <div className="steps-content"><p className="is-size-7">Summary</p></div>
            </Link>
        </li>)
    }

    render() {
        let activeCategoryName = this.props.match.params.category;
        const activeCategoryPages = this.props.categories[activeCategoryName.toLowerCase()];
        return (
            <ul className="steps my-step-style has-content-centered is-hidden-mobile is-small">
                {this.getStepsForPages(activeCategoryName, activeCategoryPages)}
            </ul>)
    }
}

const mapStateToProps = state => {
    return {categories: state.categories}
};

const ConnectedCategorySteps = connect(mapStateToProps)(CategorySteps);
export default withRouter(ConnectedCategorySteps);
