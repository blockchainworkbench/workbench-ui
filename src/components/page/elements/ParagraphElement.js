import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function ParagraphElement(props) {
    return <ReactMarkdown source={props.content}/>;
}