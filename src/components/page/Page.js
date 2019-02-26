import React from 'react';
import {Redirect, withRouter} from "react-router-dom";
import TitleHeader from "../layout/TitleHeader";
import CategorySteps from "../layout/CategorySteps";
import connect from "react-redux/es/connect/connect";
import {buildCategoryUrl, urlify} from "../../lib/helpers";
import PageContent from "./PageContent";

class Page extends React.Component {

    getSelectedPage() {
        const activePage = this.props.match.params.page;
        for (const page of this.props.pages) {
            if (urlify(page.title).toLowerCase() === activePage.toLowerCase()) {
                return page;
            }
        }
    }

    render() {
        const page = this.getSelectedPage();
        const categoryName = this.props.match.params.category;
        if(page && page.url && page.url.endsWith('index.html')) {
            return <Redirect to={buildCategoryUrl(categoryName)} />
        }
        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container">
                        <CategorySteps/>
                        <PageContent page={page} category={categoryName}/>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {pages: state.pages}
};

const ConnectedPage = connect(mapStateToProps)(Page);
export default withRouter(ConnectedPage);
