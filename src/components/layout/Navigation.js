import React from "react";
import {NavLink} from 'react-router-dom';
import {NavHashLink} from 'react-router-hash-link';
import LoadingIndicator from "./LoadingIndicator";
import {connect} from "react-redux";
import {loadUserProfile} from "../../actions";

class Navigation extends React.Component {

    componentDidMount() {
        this.loadProfile();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadProfile();
    }

    loadProfile() {
        if (!this.props.user.loading && !this.props.user.authenticated && !this.props.user.error) {
            console.log('navigation: loading profile information');
            this.props.loadProfile();
        }
    }

    render() {
        return (
            <nav className='navbar is-fixed-top'>
                <div className='navbar-end'>
                    <LoadingIndicator/>
                    <NavLink className='navbar-item' activeClassName='is-active' to='/pages/introduction'>
                        Introduction
                    </NavLink>
                    <NavHashLink className='navbar-item' activeClassName='is-active' to='/#advanced'>
                        Advanced Search
                    </NavHashLink>
                    {this.getLoginOrProfileNav()}
                    <NavLink className='navbar-item' activeClassName='is-active' to='/web3'>Web3 Playground</NavLink>
                </div>
            </nav>);
    }

    getLoginOrProfileNav() {
        if (this.props.user.authenticated) {
            return (<>
                <NavLink className='navbar-item' activeClassName='is-active' to='/profile'>
                    {this.props.user.displayName}</NavLink>
                <NavLink className='navbar-item' activeClassName='is-active' to='/logout'>Logout</NavLink>
            </>)
        } else {
            return (<NavLink className='navbar-item' activeClassName='is-active' to='/login'>Login</NavLink>)
        }
    }
}


const mapStateToProps = state => {
    return {
        user: state.appState.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadProfile: () => dispatch(loadUserProfile())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
