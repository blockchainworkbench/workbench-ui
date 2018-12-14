import React from "react";
import {NavLink} from 'react-router-dom';

export default function Navigation() {
    return (
        <nav className='navbar is-fixed-top'>
            <div className='navbar-end'>
                <NavLink className='navbar-item' activeClassName='is-active' to='/pages/introduction'>
                    Introduction
                </NavLink>
                <NavLink className='navbar-item' activeClassName='is-active' to='/?advanced'>
                    Advanced Search
                </NavLink>
                <NavLink className='navbar-item' activeClassName='is-active' to='/login'>Login</NavLink>
            </div>
        </nav>);
}