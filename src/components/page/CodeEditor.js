import React from 'react';
import AceEditor from "react-ace";

import 'brace/theme/tomorrow';
import 'react-ace/dist/react-ace';
import 'brace/mode/javascript';
import 'ace-mode-solidity/build/legacy/v1.3.3/src-brace/mode-solidity';

class CodeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    render() {
        return (
            <AceEditor
                className='is-fullwidth'
                mode="solidity"
                theme="tomorrow"
                onChange={this.handleChange}
                name="UNIQUE_ID_OF_DIV"
                readOnly={this.props.readOnly === true}
                width='100%'
                tabSize={2}
                value={this.props.content}
                editorProps={{$blockScrolling: true}}/>);
    }
}

export default CodeEditor;