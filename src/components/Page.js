import React from 'react';
import {Link} from "react-router-dom";

export default function Page() {
    return (
        <section className="hero">
            <div className="hero-body">
                <div className="container">
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
                        <li className="steps-segment is-active">
                            <Link to='/pages/introduction/wallets'>
                                <span className="steps-marker">
                                    <span className="icon">
                                        <i className="fa fa-circle is-size-7"></i>
                                    </span>
                                </span>
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


                    <h1 className="title has-text-centered">
                        Wallets
                    </h1>

                    <div className="content">
                        <p className='has-text-danger'>
                            here would the content of the page appear..
                        </p>
                        <br/>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet malesuada enim. Nulla
                            volutpat dapibus tempus. Duis sagittis enim non porttitor convallis. Etiam a dolor
                            vulputate, elementum lacus maximus, molestie libero. Donec accumsan accumsan egestas. Proin
                            in sapien dolor. Aenean gravida non velit et commodo. In gravida maximus interdum.</p>

                        <p>Mauris luctus ultrices libero vel aliquet. Aliquam erat volutpat. Maecenas pretium porttitor
                            arcu in aliquam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                            ridiculus mus. Praesent eget tellus in libero sagittis porta. Vivamus aliquet lectus rutrum
                            lorem laoreet, ac ultricies tellus tincidunt. Vivamus non mauris ultricies, placerat turpis
                            eu, aliquet libero. Nunc aliquam dapibus turpis eget malesuada.</p>

                        <div className='level'>
                            <div className='level-left'>
                                &lt;&lt; <Link to='/pages/introduction/transactions'>Transactions</Link> (previous)
                            </div>

                            <div className='level-left'>
                                (next) <Link to='/pages/introduction/mempool'>Mempool</Link> &gt;&gt;
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}