import React from 'react';
import {withRouter} from "react-router-dom";
import TitleHeader from "./layout/TitleHeader";
import CategorySteps from "./layout/CategorySteps";
import connect from "react-redux/es/connect/connect";
import {urlify} from "../lib/helpers";
import PageContent from "./page/PageContent";

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

        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container">
                        <CategorySteps/>
                        <PageContent page={page}/>
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