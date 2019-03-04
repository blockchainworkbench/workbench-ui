import React from 'react';
import TitleHeader from "./layout/TitleHeader";

class Playground extends React.Component {


    render() {
        return (<section className="hero">
            <TitleHeader/>
            <div className="hero-body">
                <div className="container">
                    Test Area
                </div>
            </div>
        </section>)
    }
}

export default Playground;

