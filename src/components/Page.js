import React from 'react';
import {withRouter} from "react-router-dom";
import TitleHeader from "./layout/TitleHeader";
import CategorySteps from "./layout/CategorySteps";
import connect from "react-redux/es/connect/connect";
import {urlify} from "../lib/helpers";
import PageContent from "./page/PageContent";
import CategorySummary from "./page/CategorySummary";

class Page extends React.Component {

    getSelectedPage() {
        const activePage = this.props.match.params.page;
        for (const page of this.props.pages) {
            if (urlify(page.title) === activePage) {
                return page;
            }
        }
    }

    render() {
        const page = this.getSelectedPage();
        const pageName = this.props.match.params.page;
        const categoryName = this.props.match.params.category;
        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container">
                        <CategorySteps/>
                        {pageName !== 'summary'
                            ? <PageContent page={page} category={categoryName}/>
                            : <CategorySummary categoryTitle={categoryName}/>}
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