import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import TitleHeader from "./layout/TitleHeader";
import {getDifficultyColorForTag, urlify} from "../lib/helpers";
import CategorySteps from "./layout/CategorySteps";

class Pages extends React.Component {

    getTilesForPages(category, pages) {
        let tiles = [];
        if (pages) {
            tiles = pages.map(page => {
                return (<div key={page.url} className="tile is-parent is-4 catLink column">
                    <div className="tile is-child box">
                        <Link to={`/pages/${category}/${urlify(page.title)}`}>
                            <p>
                                <span className="title is-4">{page.title}</span>
                                {page.difficulty ? <span
                                        className={`tag is-pulled-right ${getDifficultyColorForTag(page.difficulty)}`}>
                                        {page.difficulty}</span>
                                    : null}
                            </p>
                            <p className="content"/>
                            <p className="content tags">
                                {page.categories.map(category =>
                                    <span key={category} className="tag catItem is-info">{category}</span>)}
                            </p>
                        </Link>
                    </div>
                </div>);
            });
        }
        return tiles;
    }

    render() {
        const activeCategoryName = this.props.match.params.category;
        const activeCategoryPages = this.props.categories[activeCategoryName];
        const title = activeCategoryPages ? activeCategoryName : 'Category not found';

        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <CategorySteps/>
                        <h1 className="title">{title}</h1>
                        <div className="tile is-ancestor columns is-multiline">
                            {this.getTilesForPages(activeCategoryName, activeCategoryPages)}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {categories: state.categories}
};

const ConnectedPages = connect(mapStateToProps)(Pages);
export default withRouter(ConnectedPages);

