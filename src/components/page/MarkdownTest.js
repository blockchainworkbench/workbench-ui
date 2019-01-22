import React from 'react';
import connect from "react-redux/es/connect/connect";
import {loadPageContent} from "../../actions";

import components from './MarkdownComponents';

// import { MDXTag } from '@mdx-js/tag';

import {mdx} from 'mdx.macro';


class MarkdownTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {data: null}
    }

    componentDidMount() {
        this.loadPageContent();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadPageContent();
    }

    loadPageContent() {
        if (this.props.page && !this.props.page.content) {
            console.log(`Loading content for page ${this.props.page.title}`);
            this.props.loadPage(this.props.page.url);
        }
    }

    render() {
        if (this.props.page && this.props.page.content) {
            console.log('content loaded');

            const SampleInlineMDComponent = mdx`
import DemoJSX from './DemoJSX';
import CodeExercise from "./CodeExercise";

# Component Test
This is a test markdown.

[Link] (https://www.google.com)

## DemoJSX
<DemoJSX title='React Component in Markdown' content='Lorem ipsum ....' />

## Code Test
<CodeExercise title='Code In Markdown' description='It looks like \`SpaceMuffin\` had a secret recipe. Expose it to the world!' 
content='pragma solidity ^0.4.24;\\ncontract x{ \\n\\n}'/>`;

            // const MdxContent = mdx`${this.props.page.content}`;
            return <SampleInlineMDComponent components={components}/>
        } else {
            return <div>Loading...</div>
        }
    }
}

const mapStateToProps = state => {
    return {page: state.pages.find(page => page.url === '/pages/editortest/c1.html')}
};


const mapDispatchToProps = dispatch => {
    return {
        loadPage: pageUrl => dispatch(loadPageContent(pageUrl))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkdownTest);

