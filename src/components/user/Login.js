import React from 'react';
import {Link} from 'react-router-dom';
import TitleHeader from "../layout/TitleHeader";

export default function Login() {
    return (
        <section className="hero">
            <TitleHeader/>
            <div className="hero-body">
                <div className="container has-text-centered">
                    {
                        <ul className="steps my-step-style has-content-centered is-hidden-mobile">
                            <li className="steps-segment">
                                <Link to='/pages/introduction'>
                                    <span className="steps-marker is-black"></span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Overview</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment">
                                <Link to='/pages/introduction/transactions'>
                                    <span className="steps-marker"></span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Transactions</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment">
                                <Link to='/pages/introduction/wallets'>
                                    <span className="steps-marker"></span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Wallets</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment">
                                <Link to='/pages/introduction/mempool'>
                                    <span className="steps-marker"></span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Mempool</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment">
                                <Link to='/pages/introduction/mining'>
                                    <span className="steps-marker"></span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Mining</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment">
                                <Link to='/pages/introduction/consensus'>
                                    <span className="steps-marker"></span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Consensus Algorithms</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment is-active">
                                <Link to='/pages/introduction/Security'>
                                    <span className="steps-marker">
                                        <span className="icon">
                                        <i className="fa fa-circle is-size-7"></i>
                                      </span>
                                    </span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Security</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment">
                                <Link to='/pages/introduction/collisions'>
                                    <span className="steps-marker"></span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Collision</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment">
                                <Link to='/pages/introduction/scalability'>
                                    <span className="steps-marker"></span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Scalability</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment">
                                <Link to='/pages/introduction/summary'>
                                <span className="steps-marker">
                                    <span className="icon">
                                    <i className="fa fa-check is-size-7"></i>
                                  </span>
                                </span>
                                    <div className="steps-content">
                                        <p className="is-size-5">Summary</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    }
                    {
                        <ul className="steps my-step-style has-content-centered is-hidden-mobile is-thin">
                            <li className="steps-segment">
                                <Link to='/pages/introduction/transactions'>
                                    <span className="steps-marker is-black"></span>
                                    <div className="steps-content">
                                        <p className="is-size-7">Overview</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="steps-segment">
                                <span className="steps-marker"></span>
                                <div className="steps-content">
                                    <p className="is-size-7">Transactions</p>
                                </div>
                            </li>
                            <li className="steps-segment">
                                <span className="steps-marker"></span>
                                <div className="steps-content">
                                    <p className="is-size-7">Wallets</p>
                                </div>
                            </li>
                            <li className="steps-segment">
                                <span className="steps-marker"></span>
                                <div className="steps-content">
                                    <p className="is-size-7">Mempool</p>
                                </div>
                            </li>
                            <li className="steps-segment">
                                <span className="steps-marker"></span>
                                <div className="steps-content">
                                    <p className="is-size-7">Mining</p>
                                </div>
                            </li>
                            <li className="steps-segment">
                                <span className="steps-marker"></span>
                                <div className="steps-content">
                                    <p className="is-size-7">Consensus Algorithms</p>
                                </div>
                            </li>
                            <li className="steps-segment is-active is-dashed">
                                <span className="steps-marker is-hollow"></span>
                                <div className="steps-content">
                                    <p className="is-size-7">Security</p>
                                </div>
                            </li>
                            <li className="steps-segment is-dashed">
                                <span className="steps-marker"></span>
                                <div className="steps-content">
                                    <p className="is-size-7">Collision</p>
                                </div>
                            </li>
                            <li className="steps-segment is-dashed">
                                <span className="steps-marker"></span>
                                <div className="steps-content">
                                    <p className="is-size-7">Scalability</p>
                                </div>
                            </li>
                            <li className="steps-segment is-dashed">
                                <span className="steps-marker is-hollow"></span>
                                <div className="steps-content">
                                    <p className="is-size-7">Summary</p>
                                </div>
                            </li>
                        </ul>
                    }
                    <h1 className="title">
                        Login
                    </h1>
                </div>
            </div>
        </section>
    )
}