import React from 'react';
import {connect} from 'react-redux';

class LoadingIndicator extends React.Component {
    render() {
        return (this.props.loading
            ? <p className='icon loading has-text-info'><i className='fas fa-spinner fa-spin'/></p>
            : null);
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.appState.pages.loading
    };
};

export default connect(mapStateToProps)(LoadingIndicator);