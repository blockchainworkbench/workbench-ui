import React from 'react';
import Navigation from './layout/Navigation';
import TitleHeader from "./layout/TitleHeader";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './user/Login';
import Pages from './Pages';
import Page from './Page';


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation/>
                    <Route exact path='/?advanced' component={Home}/>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/pages/:category/:page' component={Page}/>
                    <Switch>
                        <Redirect from='/start' to='/pages/introduction'/>
                        <Route exact path='/pages/:category' component={Pages}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;