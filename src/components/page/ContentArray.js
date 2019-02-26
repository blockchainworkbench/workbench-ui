import React from 'react';
import Elements from './PageElements';

class ContentArray extends React.Component {

    render() {
        if (this.props.content && typeof (this.props.content) !== 'string') {
            return (<>{this.props.content.map((element, idx) => {
                const elementComponent = Elements[element.type];
                if (elementComponent) {
                    return React.createElement(elementComponent, {
                        'key': idx, 'id': idx, 'content': element.content, 'type': element.type, 'elem': element
                    });
                } else {
                    if (typeof (element) === 'string') {
                        return <span>{element}</span>
                    } else {
                        return React.createElement(Elements['unknown'], {
                            'key': idx, 'type': element.type
                        });
                    }
                }
            })}</>)
        } else {
            return (<div>Page is not properly loaded</div>)
        }
    }
}

export default ContentArray;
