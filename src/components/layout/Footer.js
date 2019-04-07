import React from 'react'
import { Link } from 'react-router-dom'
import brandLogo from '../../assets/img/brand-logo-white-small.png'

export default function Footer() {
  return (
    <footer className={'footer has-background-info level'}>
      <Link to={'/'}>
        <img className={'image'} src={brandLogo} />
      </Link>
      <div className={'level has-text-centered is-2'}>
        <div className="level-item">
          <a className={'has-text-white'} href={'http://forum.blockchainworkbench.com'} target={'_blank'} rel={'noopener noreferrer'}>
            Forum
          </a>
        </div>
        <div className="level-item ml2">
          <a className={'has-text-white'} href={'https://github.com/blockchainworkbench'} target={'_blank'} rel={'noopener noreferrer'}>
            Github
          </a>
        </div>
        <div className="level-item ml2">
          <Link className={'has-text-white'} to={'/contact'}>
            About
          </Link>
        </div>
        <div className="level-item ml2">
          <Link className={'has-text-white'} to={'/contact'}>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
