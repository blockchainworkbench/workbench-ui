import React from 'react';
import TitleHeader from "../layout/TitleHeader";
import {connect} from "react-redux";
import {checkWeb3Account, saveProfile, WEB3_ACCOUNT_STATE} from "../../actions";
import {Link, Redirect} from "react-router-dom";
import {Prompt} from "react-router";

class ProfileEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pkChanged: false,
            nameChanged: false,
            submitted: false,
            web3Authorizing: false,
            pkValue: '',
            nameValue: '',
            initialized: false
        };
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.onChangePublicKey = this.onChangePublicKey.bind(this);
        this.saveProfileChanges = this.saveProfileChanges.bind(this);
        this.loadFromWallet = this.loadFromWallet.bind(this);
        this.isWalletAuthorizing = this.isWalletAuthorizing.bind(this);
    }

    render() {
        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">User Profile</h1>
                        <div className='content'>
                            {this.getProfileEditContent()}
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    componentDidMount() {
        this.setFormValues();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setFormValues();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.state.web3Authorizing) {
            if (nextProps.web3Account.state === WEB3_ACCOUNT_STATE.AUTHORIZED) {
                if (nextProps.web3Account.address) {
                    this.onChangePublicKey(nextProps.web3Account.address);
                }
                return;
            }
            if (nextProps.web3Account.state !== WEB3_ACCOUNT_STATE.PENDING) {
                this.setState({web3Authorizing: false});
            }
        }
    }

    setFormValues() {
        if (this.props.user && !this.props.user.loading && this.props.user.authenticated && !this.state.initialized) {
            this.setState({
                pkValue: this.props.user.publicKey, nameValue: this.props.user.displayName, initialized: true
            });
        }
    }

    getProfileEditContent() {
        if (this.state.submitted) {
            if (this.props.user.saving) {
                return <div>
                    <span className='icon loading has-text-info'><i className='fas fa-spinner fa-spin'/></span>
                    <span>Saving changes...</span>
                </div>
            } else {
                return <Redirect to='/login'/>
            }
        } else {
            return this.getUserProfileEditForm()
        }
    }

    saveProfileChanges(e) {
        e.preventDefault();
        this.setState({pkChanged: false, nameChanged: false, submitted: true});
        this.props.saveProfile(e.target.displayName.value, e.target.publicKey.value);
    }

    onChangeDisplayName(event) {
        this.setState({nameValue: event.target.value});
    }

    onChangePublicKey(value) {
        this.setState({pkValue: value, web3Authorizing: false});
    }

    loadFromWallet(event) {
        event.preventDefault();
        this.setState({web3Authorizing: true});
        this.props.checkWeb3Account();
    }

    isWalletAuthorizing() {
        return this.state.web3Authorizing;
    }

    hasUnsavedChanges() {
        return this.state.pkValue !== this.props.user.publicKey || this.state.nameValue !== this.props.user.displayName;
    }

    getUserProfileEditForm() {
        const unsavedChanges = this.hasUnsavedChanges();
        const isAuthorizing = this.isWalletAuthorizing();
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
                                <input id='displayName' name='displayName' type='text' className='input'
                                       value={this.state.nameValue} onChange={this.onChangeDisplayName}/>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal has-addons">
                    <div className="field-label">
                        <label className="label">Public Key</label>
                    </div>
                    <div className="field-body">
                        <p className='control has-icons-left is-expanded'>
                            <span className='icon is-small is-left'><i className='fas fa-address-book'/></span>
                            <input id='publicKey' name='publicKey' type='text' className='input'
                                   readOnly={true} disabled={true} value={this.state.pkValue}/>
                        </p>
                        <p className='control'>
                            <button disabled={isAuthorizing} onClick={this.loadFromWallet}
                                    className={`button is-info ${isAuthorizing ? 'is-loading' : ''}`}>
                                {isAuthorizing ? '' : 'Load from Wallet'}
                            </button>
                        </p>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label"><label className="label"><Link to='/profile'>Cancel</Link></label>
                    </div>
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
        user: state.appState.user,
        web3Account: state.appState.web3Account
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveProfile: (displayName, publicKey) => dispatch(saveProfile(displayName, publicKey)),
        checkWeb3Account: () => dispatch(checkWeb3Account())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
