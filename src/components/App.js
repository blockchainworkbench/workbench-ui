import React from 'react';
import Navigation from './layout/Navigation';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './user/Login';
import Logout from './user/Logout';
import Pages from './Pages';
import Page from './Page';
import {loadPages} from "../actions";
import {connect} from "react-redux";
import Footer from './layout/Footer';
import Web3Playground from "./Web3Playground";
import Profile from "./user/Profile";

class App extends React.Component {

    componentDidMount() {
        this.props.loadPages();
    }

    render() {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div>
                    <Navigation/>
                    <Route exact path='/?advanced' component={Home}/>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/web3' component={Web3Playground}/>
                    <Route path='/pages/:category/:page' component={Page}/>
                    <Switch>
                        <Redirect from='/start' to='/pages/introduction'/>
                        <Route exact path='/pages/:category' component={Pages}/>
                    </Switch>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadPages: () => dispatch(loadPages())
    };
};

export default connect(null, mapDispatchToProps)(App);
