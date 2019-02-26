import React from 'react';
import ReactMarkdown from 'react-markdown';
import ContentArray from "../ContentArray";

export default function ParagraphElement(props) {
    return <ContentArray content={props.content}/>;
}
