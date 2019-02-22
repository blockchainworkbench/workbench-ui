import React from 'react';
import TitleHeader from "../layout/TitleHeader";
import {connect} from "react-redux";
import {loadUserProfile, saveProfile} from "../../actions";
import {Link, Redirect} from "react-router-dom";
import {Prompt} from "react-router";

class ProfileEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {unsavedChanges: false};
        this.displayNameChanged = this.displayNameChanged.bind(this);
        this.saveProfileChanges = this.saveProfileChanges.bind(this);
    }

    render() {
        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">Edit User Profile</h1>
                        <div className='content'>
                            {this.getProfileEditContent()}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    getProfileEditContent() {
        if(this.props.user.saving) {
            return this.getProfileSaving();
        } else {
            return this.getUserProfileEditForm()
        }
    }


    getProfileSaving() {
        if (this.props.user.loading) {
            return <div>
                <span className='icon loading has-text-info'><i className='fas fa-spinner fa-spin'/></span>
                <span>Saving changes...</span>
            </div>
        } else {
            return <Redirect to='/login'/>
        }
    }

    saveProfileChanges(e) {
        e.preventDefault();
        this.props.saveProfile(e.target.displayName.value, null);
    }

    displayNameChanged(event) {
        this.setState({unsavedChanges: event.target.value !== event.target.defaultValue});
    }

    getUserProfileEditForm() {
        const {unsavedChanges} = this.state;
        return <>
            <form onSubmit={this.saveProfileChanges}>
                <Prompt when={unsavedChanges}
                        message={`You have unsaved changes. Are you sure you want to leave this page?`}/>
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Display Name</label>
                    </div>
                    <div className="field-body">
                        <div className="field has-text-left">
                            <p className='control has-icons-left'>
                                <span className='icon is-small is-left'><i className='fas fa-user'/></span>
                                <input id='displayName' name='displayName' type='text' className='input' defaultValue={this.props.user.displayName}
                                       onChange={this.displayNameChanged}/>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label">
                        <label className="label">Public Key</label>
                    </div>
                    <div className="field-body">
                        <div className="field has-text-left">{this.props.user.publicKey}</div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label"/>
                    <div className="field-body">
                        <div className="field has-text-left">
                            <button type='submit' className={`button is-info `} disabled={!unsavedChanges}>Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    }
}

const mapStateToProps = state => {
    return {
        user: state.appState.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveProfile: (displayName, publicKey) => dispatch(saveProfile(displayName, publicKey))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
