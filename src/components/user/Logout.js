import React from 'react';
import {connect} from "react-redux";
import {logoutUser} from "../../actions";
import {Redirect} from "react-router-dom";
import TitleHeader from "../layout/TitleHeader";

class Logout extends React.Component {

    componentDidMount() {
        this.logout();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.logout();
    }

    logout() {
        this.props.logout();
    }

    render() {
        if (this.props.user.authenticated) {
            return (
                <section className="hero">
                    <TitleHeader/>
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <h1 className="title">Logout</h1>
                            <div className='content'>
                                <div>
                                    <span className='icon loading has-text-info'>
                                        <i className='fas fa-spinner fa-spin'/></span>
                                    <span>Logging out...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else {
            return <Redirect to='/login'/>
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
        logout: () => dispatch(logoutUser())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Logout);
