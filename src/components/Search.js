import React from 'react';
import DifficultyFilter from "./search/DifficultyFilter";
import CategoryFilter from "./search/CategoryFilter";
import PageList from "./search/PageList";
import CategoryList from "./search/CategoryList";

export default function Search() {
    return (
        <section className="hero is-fullheight-with-navbar" id='advanced'>
            <div className="hero-body align-items-normal">
                <div className="container">
                    <div className='mb70'>
                        <CategoryList/>
                    </div>
                    <div>
                        <h1 className="title has-text-centered">Advanced Search</h1>
                        <DifficultyFilter/>
                        <CategoryFilter/>
                        <h3 className='title'>Pages</h3>
                        <PageList/>
                    </div>
                </div>
            </div>
        </section>
    )
}
