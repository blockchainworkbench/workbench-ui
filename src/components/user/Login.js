import React from 'react';
import TitleHeader from "../layout/TitleHeader";
import {connect} from "react-redux";
import {logoutUser} from "../../actions";
import {Redirect} from "react-router-dom";

class Login extends React.Component {

    loginGithub() {
        window.location = '/api/auth/github';
    }

    loginGoogle() {
        console.log('google');
        window.location = '/api/auth/google';
    }

    render() {
        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            Login
                        </h1>
                        <div className='content'>
                            {this.getProfileInfo()}
                            <a href='/api/auth/github' onClick={this.loginGithub}
                               className='button is-fullwidth is-dark'>
                                <span className="icon has-text-white"><i className="fab fa-github"/></span>
                                <span>Login with Github</span>
                            </a>
                            <a href='/api/auth/google' onClick={this.loginGoogle}
                               className='button mt10 is-fullwidth is-info'>
                                <span className="icon has-text-white mr10"><i className="fab fa-google"/></span>
                                <span>Login with Google</span>
                            </a>

                        </div>
                    </div>
                </div>
            </section>
        )
    }

    getProfileInfo() {
        if (this.props.user.error) {
            console.log('user profile error:', this.props.user.error);
        }
        if (this.props.user.authenticated) {
            return <Redirect to='/profile'/>
            /*
            if (this.props.user.loading) {
                return (<div>
                    <span className='icon loading has-text-info'><i className='fas fa-spinner fa-spin'/></span>
                    <span>Logging out</span>
                </div>);
            } else {
                return <span className='button is-fullwidth is-danger' onClick=''>Logout</span>
            }
            */
        }
    }

    logout() {
        this.props.logout();
    }
}

const mapStateToProps = state => {
    return {
        user: state.appState.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logoutUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
