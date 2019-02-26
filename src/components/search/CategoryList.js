import React from 'react';
import connect from "react-redux/es/connect/connect";
import PageListItem from "./PageListItem";

class CategoryList extends React.Component {
    render() {
        return (<><h1 className="title has-text-centered">Categories</h1>{this.renderCategories()}</>)
    }

    renderCategories() {
        const categories = [];

        const content = this.props.pages.map(page => <PageListItem key={page.url} page={page}/>);
        if (this.props.pages.length === 0) {
            content.push(<div key='no-data' className="tile is-parent column has-text-grey-light">
                No pages for the selected categories found</div>);
        }
        return (<div className='tile is-ancestor columns is-multiline'>{content}</div>);
    }
}

const firstPageOfEachCategory = (categories) => {
    return Object.keys(categories).map(name => categories[name][0]);
};

const mapStateToProps = state => {
    return {
        pages: firstPageOfEachCategory(state.categories)
    };
};


export default connect(mapStateToProps)(CategoryList);
