import React from 'react';
import PageFactory from './PageElementFactory';

class PageContentArray extends React.Component {

    render() {
        if (this.props.page && this.props.page.content && typeof (this.props.page.content) !== 'string') {
            return (
                <div className="content-array">
                    {this.props.page.content.map((element, idx) => PageFactory.createElement(element, idx))}
                </div>
            )
        } else {
            return (<div>Page is not properly loaded</div>)
        }
    }
}

export default PageContentArray;