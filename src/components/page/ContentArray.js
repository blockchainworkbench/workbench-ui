import React from 'react';
import Elements from './elements';

class ContentArray extends React.Component {

    render() {
        if (this.props.content && typeof (this.props.content) !== 'string') {
            return (<>{this.props.content.map((element, idx) => {
                const elementComponent = Elements[element.type];
                if (elementComponent) {
                    return React.createElement(elementComponent, {
                        'key': idx, 'id': idx, 'content': element.content, 'type': element.type, 'element': element
                    });
                } else {
                    if (typeof (element) === 'string') {
                        return <span key={idx}>{element}</span>
                    } else {
                        return React.createElement(Elements['unknown'], {
                            'key': idx, 'type': element.type
                        });
                    }
                }
            })}</>)
        } else {
            return <>{this.props.content}</>;
        }
    }
}

export default ContentArray;
