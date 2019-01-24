import React from 'react';
import CodeEditor from "../CodeEditor";

export default function CodeElement(props) {
    return <div className='mb30'>
        <CodeEditor id={props.id} content={props.content.code} language={props.content.language} displaySimple={true}/>
    </div>;
}