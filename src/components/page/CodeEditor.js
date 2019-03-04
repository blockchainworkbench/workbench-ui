import React from 'react';
import AceEditor from "react-ace";

import 'brace/theme/tomorrow';
import 'react-ace/dist/react-ace';
import 'brace/mode/javascript';
import 'ace-mode-solidity/build/legacy/v1.3.3/src-brace/mode-solidity';
import 'brace/mode/html';
import 'brace/mode/python';
import 'brace/mode/text';

class CodeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event);
    }

    render() {
        let highlightActiveLine = true;
        let readOnly = false;
        const setOptions = {};
        if (this.props.displaySimple) {
            readOnly = true;
            highlightActiveLine = false;
            setOptions['showLineNumbers'] = false;
            setOptions['showFoldWidgets'] = false;
            setOptions['showGutter'] = false;
            setOptions['maxLines'] = 1000;
            setOptions['showPrintMargin'] = false;
        }
        if (this.props.readOnly) {
            readOnly = true;
        }

        return (
            <AceEditor
                className='is-fullwidth'
                mode={this.props.language ? this.props.language : "solidity"}
                theme="tomorrow"
                onChange={this.handleChange}
                name={`codeeditor-${this.props.id}`}
                readOnly={readOnly}
                width='100%'
                tabSize={2}
                value={this.props.content}
                highlightActiveLine={highlightActiveLine}
                setOptions={setOptions}
                editorProps={{$blockScrolling: true}}/>);
    }
}

export default CodeEditor;
