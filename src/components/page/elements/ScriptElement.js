import React from 'react';

export default function ScriptElement(props) {
    const script = document.createElement("script");
    script.innerHTML = unescapeString(props.content);
    // TODO : Only append to body if script hasn't been added in the past
    // document.body.appendChild(script);
    return <span className='has-text-danger has-text-weight-bold'>Placeholder Script TODO</span>;
    // return (null);
}

function unescapeString(content) {
    content = content.replace(/&gt;/g, '>');
    return content;
}
