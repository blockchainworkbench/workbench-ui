import React from 'react';
import DifficultyFilter from "./search/DifficultyFilter";
import CategoryFilter from "./search/CategoryFilter";
import PageList from "./search/PageList";

export default function Search() {
    return (
        <section className="hero is-fullheight-with-navbar" id='advanced-search'>
            <div className="hero-body">
                <div className="container">
                    <h1 className="title has-text-centered">
                        Advanced Search
                    </h1>
                    <DifficultyFilter/>
                    <CategoryFilter/>
                    <h3 className='title'>Pages</h3>
                    <PageList/>
                </div>
            </div>
        </section>
    )
}