import React from 'react';
import TitleHeader from "../layout/TitleHeader";
import {connect} from "react-redux";
import {loadUserProfile} from "../../actions";
import {Redirect} from "react-router-dom";

class Profile extends React.Component {

    componentDidMount() {
        this.loadProfile();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadProfile();
    }

    loadProfile() {
        if (!this.props.user.loading && !this.props.user.authenticated && !this.props.user.error) {
            console.log('loading profile information');
            this.props.loadProfile();
        }
    }

    render() {
        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">User Profile</h1>
                        <div className='content'>
                            {this.props.user.authenticated ? this.getUserProfile() : this.getLoadingInfo()}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    getLoadingInfo() {
        if (this.props.user.loading) {
            return <div>
                <span className='icon loading has-text-info'><i className='fas fa-spinner fa-spin'/></span>
                <span>Loading profile...</span>
            </div>
        } else {
            return <Redirect to='/login'/>
        }
    }


    getUserProfile() {
        const fields = [];
        fields.push(this.getLabelRow(1, 'id', this.props.user.id));
        fields.push(this.getLabelRow(2, 'Display Name', this.props.user.displayName));
        fields.push(this.getLabelRow(3, 'email', this.props.user.email));
        fields.push(this.getLabelRow(4, 'Public Key', this.props.user.publicKey));
        fields.push(this.getLabelRow(5, 'Created', this.props.user.created));
        return fields;
    }

    getLabelRow(key, label, value) {
        return (<div key={key} className="field is-horizontal">
            <div className="field-label">
                <label className="label">{label}</label>
            </div>
            <div className="field-body">
                <div className="field has-text-left">{value}</div>
            </div>
        </div>)
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


export default connect(mapStateToProps, mapDispatchToProps)(Profile);