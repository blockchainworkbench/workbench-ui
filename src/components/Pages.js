import React from 'react';
import {Link} from "react-router-dom";
import TitleHeader from "./layout/TitleHeader";

export default function Pages() {
    return (
        <section className="hero">
            <TitleHeader/>
            <div className="hero-body">
                <div className="container has-text-centered">
                    <ul className="steps my-step-style has-content-centered is-hidden-mobile">
                        <li className="steps-segment is-active">
                            <Link to='/pages/introduction'>
                                <span className="steps-marker">
                                    <span className="icon">
                                        <i className="fa fa-circle is-size-7"></i>
                                    </span>
                                </span>
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
                        <li className="steps-segment">
                            <Link to='/pages/introduction/Security'>
                                <span className="steps-marker"></span>
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

                    <h1 className="title">
                        Introduction
                    </h1>

                    <div className="tile is-ancestor">
                        <div className="tile is-parent is-4 catLink">
                            <div className="tile is-child box"><a href="/pages/introduction/wallets"><p><span
                                className="title is-4">Wallets</span><span
                                className="tag is-pulled-right is-success">easy</span></p><p className="content"></p><p
                                className="content tags"><span className="tag catItem is-info">introduction</span></p>
                            </a></div>
                        </div>
                        <div className="tile is-parent is-4 catLink">
                            <div className="tile is-child box"><a href="/pages/introduction/transactions"><p><span
                                className="title is-4">Transactions</span><span
                                className="tag is-pulled-right is-success">easy</span></p><p className="content"></p><p
                                className="content tags"><span className="tag catItem is-info">introduction</span></p>
                            </a></div>
                        </div>
                        <div className="tile is-parent is-4 catLink">
                            <div className="tile is-child box"><a href="/pages/introduction/mempool"><p><span
                                className="title is-4">Mempool</span><span
                                className="tag is-pulled-right is-success">easy</span></p><p className="content"></p><p
                                className="content tags"><span className="tag catItem is-info">introduction</span><span
                                className="tag catItem is-info">mining</span></p></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}