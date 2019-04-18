import React from 'react'
import { Link } from 'react-router-dom'
import error404Picture from '../../assets/img/undraw_404_error.svg'
import TitleHeader from '../layout/TitleHeader'

export class Page404 extends React.Component {
  render() {
    return (
      <div className={'is-fullheight'}>
        <TitleHeader />
        <div className={'container'}>
          <section className="section" style={{ marginBottom: '-3rem' }}>
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column feature-box">
                  <h1 className={'title'}>Ooops!</h1>
                  <h2 className={'subtitle'}>We can't find the page you are looking for</h2>

                  <Link className={'button is-info is-big'} to={'/'}>
                    Take me Home
                  </Link>
                </div>
                <div className="column">
                  <img className={'image image-box border-shadow'} src={error404Picture} height={200} alt={''} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
