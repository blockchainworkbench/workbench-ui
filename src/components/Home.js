import React from 'react'
import { Link } from 'react-router-dom'
import workerImg from '../assets/img/worker.svg'
import blockchainBasicsImg from '../assets/img/undraw_deliveries_131a.svg'
import smartContractImg from '../assets/img/undraw_operating_system_4lr6.svg'

import hslu from '../assets/img/partners/hslu_logo.svg'
import imperial from '../assets/img/partners/imperial_logo.svg'
import io from '../assets/img/partners/iO_Red.png'

const partners = [io, hslu, imperial]

export default function Home() {
  return (
    <div>
      <section className="hero is-light is-fullheight hero-header-component">
        <div className="hero-body has-text-white">
          <div className="container has-text-centered">
            <img src={workerImg} className={'image landing-page-image'} alt={''} />
            <h1 className={'title is-1 has-text-white is-cursive is-extra-bold'}>Forge Your Blockchain Skills</h1>
            <h2 className={'is-2 has-text-white'}>
              Blockchain theory curated by Universities, Interactive online IDE, No certification fee
            </h2>
            <div className={'content'} />
            <div className="buttons" style={{ display: 'block' }}>
              <Link className="button is-light is-big" to={'/start'}>
                <span className="icon">
                  <i className="fas fa-graduation-cap" />
                </span>
                <span>Beginner</span>
              </Link>
              <Link className={'button is-dark is-big'} to={'/search'}>
                <span className="icon">
                  <i className="fas fa-terminal" />
                </span>
                <span>Expert</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column" style={{ padding: '1rem' }}>
              <img className={'image image-box border-shadow'} src={blockchainBasicsImg} height={200} alt={''} />
            </div>
            <div className="column feature-box">
              <h1 className={'title'}>Blockchain basics</h1>
              <aside className="menu">
                <ul className="menu-list">
                  <li>
                    <a href={'http://'} className="text is-2">
                      Cryptography
                    </a>
                  </li>
                  <li>
                    <a href={'http://'} className="text is-2">
                      Bitcoin
                    </a>
                  </li>
                  <li>
                    <a href={'http://'} className="text is-2 is-active">
                      Start Learning
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <div className={'container'}>
        <section className="section has-background-color-darker">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column feature-box">
                <h1 className={'title'}>Smart contracts</h1>
                <aside className="menu">
                  <ul className="menu-list">
                    <li>
                      <a href={'http://'} className="text is-2">
                        Functions
                      </a>
                    </li>
                    <li>
                      <a href={'http://'} className="text is-2">
                        Payments
                      </a>
                    </li>
                    <li>
                      <a href={'http://'} className="text is-2 is-active">
                        Start Learning
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>
              <div className="column" style={{ padding: '1rem' }}>
                <img className={'image image-box border-shadow'} src={smartContractImg} height={200} alt={''} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className={'mt3 section partners'}>
        <h1 className={'title has-text-centered'}>Partners</h1>
        <div className={'container is-flex'}>
          {partners.map((partner, index) => (
            <figure key={index} className={'image'}>
              <img src={partner} alt={''} />
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
