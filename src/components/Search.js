import React from 'react';
import CategoryFilter from "./search/CategoryFilter";
import PageList from "./search/PageList";

export default function Search() {
    return (
        <section className="hero is-fullheight-with-navbar" id='advanced'>
            <div className="hero-body align-items-normal">
                <div className="container">
                    <h1 className="title has-text-centered">
                        Advanced Search
                    </h1>
                    <CategoryFilter/>
                    <h3 className='title'>Pages</h3>
                    <PageList/>
                </div>
            </div>
        </section>
    )
}