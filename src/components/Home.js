import React from 'react'
import { Link } from 'react-router-dom'
import workerImg from '../assets/img/worker.svg'
import contentCreatorImg from '../assets/img/undraw_content_creator.svg'
import interactiveDiscussionImg from '../assets/img/undraw_interactive_discussion.svg'
import codingImg from '../assets/img/undraw_coding.svg'
import smartContractImg from '../assets/img/undraw_operating_system_4lr6.svg'

import hslu from '../assets/img/partners/hslu_logo.jpg'
import imperial from '../assets/img/partners/imperial_logo.svg'
import liquidity from '../assets/img/partners/liquidity_network_logo.svg'

const partners = [
  {
    name: 'Imperial College',
    url: 'https://imperial.ac.uk',
    logo: imperial,
  },
  {
    name: 'Hochschule Luzern - Informatik',
    url: 'https://www.hslu.ch/en/lucerne-school-of-information-technology/',
    logo: hslu,
  },
  {
    name: 'Liquidity Network',
    url: 'https://liquidity.network',
    logo: liquidity,
  },
]

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

      <section className={'section'}>
        <div className={'container'}>
          <h1 className={'title is-1'}>Education at core</h1>
          <ul className={'columns mt3'}>
            <li className={'column'}>
              <figure className={'image is-128x128 is-centered'}>
                <img src={codingImg} alt={'Coding'} />
              </figure>
              <h2 className={'is-2 has-text-centered mb10'}>Programmers</h2>
              <p className={'text'}>
                Build up your blockchain skills with interactive programming exercises and get certified automatically
                at no fees.
              </p>
            </li>
            <li className={'column'}>
              <figure className={'image is-128x128 is-centered'}>
                <img src={interactiveDiscussionImg} alt={'Discussion'} />
              </figure>
              <h2 className={'is-2 has-text-centered mb10'}>Universities</h2>
              <p className={'text'}>
                Courses are currated by blockchain scholars, built by and for Universities. Provides hands-on exercises
                to your students.
              </p>
            </li>
            <li className={'column'}>
              <figure className={'image is-128x128 is-centered'}>
                <img src={contentCreatorImg} alt={'Creator'} />
              </figure>
              <h2 className={'is-2 has-text-centered mb10'}>Companies</h2>
              <p className={'text'}>
                As a blockchain company, you can showcase your technology on an open source platform.
                <br />
                <Link to={'/contact'}> Contact us</Link> for featured tutorials.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <div className={'container mt3'}>
        <section className="section has-background-color-darker">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column feature-box">
                <h1 className={'title'}>Start Learning</h1>
                <aside className="menu">
                  <ul className="menu-list">
                    <li>
                      <Link to={'/pages//Intro/Merkle_Tree'} className="text is-2">
                        Data structures
                      </Link>
                    </li>
                    <li>
                      <Link to={'/pages/Introduction'} className="text is-2">
                        Smart contracts on Ethereum
                      </Link>
                    </li>
                    <li>
                      <Link to={'/pages/Intro'} className="text is-2 is-active">
                        Blockchain basics
                      </Link>
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
        <h1 className={'title has-text-centered is-1'}>Partners</h1>
        <div className={'container is-flex'}>
          {partners.map((partner, index) => (
            <a href={partner.url} className={'border-shadow'}>
              <figure key={index} className={`image is-full-height ${index % 2 === 0 ? 'is-flex' : ''}`}>
                <img src={partner.logo} alt={partner.name} />
              </figure>
            </a>
          ))}
        </div>
      </section>

      {/* <section className={'section'}>
        Team???
      </section> */}

      <section className={'mt3 section has-background-color-darker'}>
        <div className={'container'}>
          <h1 className={'title is-1'}>Contribute</h1>
          <h2 className={'subtitle has-75-percent-width'}>
            The project is made by engineers. Everything being open source, you can contribute directly to it by
            providing documentation, translating it, or directly coding new features. You can also donate directly
            towards the project.
          </h2>
          <div className={'buttons'}>
            <a
              href={'https://github.com/blockchainworkbench'}
              className={'button is-medium is-white is-inverted is-outlined'}
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              <span className={'icon'}>
                <i className={'fab fa-github'} />
              </span>
              <span>Github</span>
            </a>
            <a
              href={'https://donation.url'}
              className={'button is-medium is-dark'}
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              <span className={'icon'}>
                <i className={'fab fa-bitcoin'} />
              </span>
              <span>Donate</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
