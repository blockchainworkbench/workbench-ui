import React from 'react'
import TitleHeader from '../layout/TitleHeader'
import ExerciseTestInput from './ExerciseTestInput'
import ExerciseTestPreview from './ExerciseTestPreview'

class Testing extends React.Component {
  render() {
    return (
      <section className="hero">
        <TitleHeader />
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Testing</h1>
          </div>

          <div className="columns">
            <div className="column is-one-third">
              <ExerciseTestInput />
            </div>
            <div className="column">
              <ExerciseTestPreview />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Testing
