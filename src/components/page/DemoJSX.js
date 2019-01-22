import React from 'react';

class DemoJSX extends React.Component {

    render() {
        return (
            <div className='hero has-background-dark has-text-left'>
                <p className='title is-3 has-text-info'>{this.props.title}</p>
                <div className='container has-text-white'>{this.props.content}</div>
            </div>);
    }
}

export default DemoJSX;