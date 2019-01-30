import React from 'react';
import Elements from './PageElements';

class PageContentArray extends React.Component {

    render() {
        if (this.props.page && this.props.page.content && typeof (this.props.page.content) !== 'string') {
            return (
                <div className="content-array mb30">
                    {this.props.page.content.map((element, idx) => {
                        const elementComponent = Elements[element.type];
                        if (elementComponent) {
                            return React.createElement(elementComponent, {
                                'key': idx, 'id': idx, 'content': element.content, 'type': element.type
                            });
                        } else {
                            return React.createElement(Elements['unknown'], {
                                'key': idx, 'type': element.type
                            });
                        }
                    })}
                </div>
            )
        } else {
            return (<div>Page is not properly loaded</div>)
        }
    }
}

export default PageContentArray;