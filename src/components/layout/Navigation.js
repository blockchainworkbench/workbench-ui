import React from "react";
import {NavLink} from 'react-router-dom';
import {NavHashLink} from 'react-router-hash-link';
import LoadingIndicator from "./LoadingIndicator";

export default function Navigation() {
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
                <NavLink className='navbar-item' activeClassName='is-active' to='/login'>Login</NavLink>
            </div>
        </nav>);
}