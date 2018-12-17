import React from 'react';
import {Link} from 'react-router-dom';
import Search from './Search';
import TitleHeader from "./layout/TitleHeader";

export default function Home() {
    return (
        <div>
            <section className="hero is-light is-fullheight-with-navbar">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title is-2">
                            Getting started
                        </h1>
                        <div className='content'>

                            <Link className='button is-medium is-success' to='/start'>Start with introduction</Link>
                            <p className='mt30'>
                                Already familiar with blockchain?
                                <strong>
                                    <a href='#advanced' className='is-link has-text-link'> Try the advanced search for topics</a>
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Search/>
        </div>
    )
}