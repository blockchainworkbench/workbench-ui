import React from 'react';
import {connect} from 'react-redux';

class LoadingIndicator extends React.Component {
    render() {
        return (this.props.loading
            ? <p className='loading'><img src='/loading.gif' alt='' className='image is-30x30'/></p> : '');
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.appState.pages.loading
    };
};

export default connect(mapStateToProps)(LoadingIndicator);