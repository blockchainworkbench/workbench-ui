import React from 'react'
import AceEditor from 'react-ace'

import 'brace/theme/dracula'
import 'brace/theme/tomorrow'
import 'react-ace/dist/react-ace'
import 'brace/mode/javascript'
import 'ace-mode-solidity/build/legacy/v1.3.3/src-brace/mode-solidity'
import 'brace/mode/html'
import 'brace/mode/python'
import 'brace/mode/text'
import 'brace/mode/markdown'

class CodeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onChange(event)
  }

  render() {
    let highlightActiveLine = true
    let readOnly = !!this.props.readOnly
    let theme = 'tomorrow'
    let setOptions = {
      fontSize: '1rem',
    }
    if (this.props.displaySimple) {
      readOnly = true
      theme = 'dracula'
      highlightActiveLine = false
      setOptions = {
        ...setOptions,
        showFoldWidgets: false,
        showGutter: true,
        highlightGutterLine: false,
        maxLines: 1000,
        showPrintMargin: false,
      }
    }

    return (
      <AceEditor
        className={'is-fullwidth'}
        mode={this.props.language ? this.props.language : 'solidity'}
        theme={theme}
        onChange={this.handleChange}
        name={`codeeditor-${this.props.id}`}
        readOnly={readOnly}
        width={'100%'}
        tabSize={2}
        value={this.props.content}
        highlightActiveLine={highlightActiveLine}
        setOptions={setOptions}
        editorProps={{ $blockScrolling: true }}
      />
    )
  }
}

export default CodeEditor
