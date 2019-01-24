import React from 'react';
import CodeEditor from "../CodeEditor";

export default function CodeElement(props) {
    return <CodeEditor id={props.id} content={props.content.code}
                       language={props.content.language} displaySimple={true}/>;
}