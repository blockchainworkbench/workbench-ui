import React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeEditor from "../CodeEditor";

class ExerciseElement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: props.content.initial,
            submitted: '',
            progress: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({content: event, submitted: this.state.submitted});
    }

    handleSubmit() {
        this.setState({content: this.state.content, submitted: this.state.content});
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.content);
        }
        alert(this.state.content);
    }

    setProgress(progress) {
        this.setState({progress: progress});
    }

    render() {
        return (
            <div className='hero mb30'>
                <div className='container'>
                    <p className='is-5 has-background-link has-text-white has-text-left has-text-weight-bold is-marginless'>
                        {this.props.content.title || "Exercise"}</p>
                    <div className='is-block has-background-danger'>Progress: {this.state.progress}</div>
                </div>
                <div className='container'>
                    <div className='has-text-left has-background-grey-lighter'>
                        <ReactMarkdown source={this.props.content.description}/>
                    </div>
                    <CodeEditor id={`exercise-${this.props.id}`} content={this.state.content}
                                onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}
                            className='button is-link is-fullwidth'>Submit
                    </button>
                </div>
            </div>);
    }
}

export default ExerciseElement;