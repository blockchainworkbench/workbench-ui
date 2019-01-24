import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function QuoteElement(props) {
    return <div className="notification is-primary mb30"><ReactMarkdown source={props.content}/></div>;
}