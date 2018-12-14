import React from 'react';
import {Link} from 'react-router-dom';
import Search from './Search';

export default function Home() {
    return (
        <div>
            <section className="hero is-light is-fullheight-with-navbar">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title is-2">
                            Getting started
                        </h1>
                        <div className='content'>

                            <Link className='button is-medium is-success' to='/start'>Start with introduction</Link>
                            <p className='mt30'>
                                Already familiar with blockchain? <strong><a href='#advanced-search'
                                                                             className='is-link'>Try the advanced search
                                for
                                topics</a></strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Search/>
        </div>
    )
}