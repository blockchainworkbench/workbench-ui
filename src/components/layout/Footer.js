import React from "react";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className='footer level has-text-centered'>
            <div className="level-item"/>
            <div className="level-item">
                <a href='https://blockchainworkbench.com'>Blockchain Workbench</a>
            </div>
            <div className="level-item">
                <Link to='/contact'>Contact</Link>
            </div>
            <div className="level-item">
                <a href='http://forum.blockchainworkbench.com' target='_blank' rel='noopener noreferrer'>Forum</a>
            </div>
            <div className="level-item">
                <a href='https://github.com/blockchainworkbench' target='_blank' rel='noopener noreferrer'>
                    <span className="icon has-text-info"><i className="fab fa-github"/></span>Github
                </a>
            </div>
            <div className="level-item">
                <Link to='/contact'>About</Link>
            </div>
            <div className="level-item">
                <Link to='/contact'>Privacy</Link>
            </div>
            <div className="level-item">
                <Link to='/contact'>Help</Link>
            </div>
            <div className="level-item"/>
        </footer>);
}

