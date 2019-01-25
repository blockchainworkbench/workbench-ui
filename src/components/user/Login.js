import React from 'react';
import TitleHeader from "../layout/TitleHeader";

class Login extends React.Component {
    render() {
        return (
            <section className="hero">
                <TitleHeader/>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h1 className="title">
                            Login
                        </h1>
                    </div>
                </div>
            </section>
        )
    }
}

export default Login;