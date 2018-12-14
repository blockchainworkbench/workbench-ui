import React from 'react';
import Navigation from './Navigation';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <Navigation/>
            <section className="hero is-info">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title is-1">
                            <Link to='/'>
                                Blockchain Workbench
                            </Link>
                        </h1>
                    </div>
                </div>
            </section>
        </div>
    )
}