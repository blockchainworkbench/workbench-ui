import React from 'react';
import CodeEditor from "../CodeEditor";

export default function CodeBlockElement(props) {
    const content = props.content[0];
    return <div className='mb30'>
        <CodeEditor id={props.id} content={content.content[0]} language={content.type} displaySimple={true}/>
    </div>;
}
