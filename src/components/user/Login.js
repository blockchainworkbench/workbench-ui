import React from 'react';
import TitleHeader from "../layout/TitleHeader";
import {connect} from "react-redux";
import {logoutUser} from "../../actions";
import {Redirect} from "react-router-dom";
import {withRouter} from "react-router";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.loginGithub = this.loginGithub.bind(this);
        this.loginGoogle = this.loginGoogle.bind(this);
        this.isLoginOnDiscourse = this.isLoginOnDiscourse.bind(this);
    }
    loginGithub() {
        if (this.isLoginOnDiscourse()) {
            window.location = '/api/auth/github?discourse=1';
        } else {
            window.location = '/api/auth/github';
        }
    }

    loginGoogle() {
        if (this.isLoginOnDiscourse()) {
            window.location = '/api/auth/google?discourse=1';
        } else {
            window.location = '/api/auth/google';
        }
    }

    isLoginOnDiscourse() {
        return (this.props.match.params.app && this.props.match.params.app === 'discourse');
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
                            <button onClick={this.loginGithub} className='button is-fullwidth is-dark'>
                                <span className="icon has-text-white"><i className="fab fa-github"/></span>
                                <span>Login with Github</span>
                            </button>
                            <button onClick={this.loginGoogle} className='button mt10 is-fullwidth is-info'>
                                <span className="icon has-text-white mr10"><i className="fab fa-google"/></span>
                                <span>Login with Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    getProfileInfo() {
        if (this.props.user.authenticated) {
            if(this.isLoginOnDiscourse()) {
                window.location = '/api/auth/discourse/already-logged-in';
            } else {
                return <Redirect to='/profile'/>
            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
