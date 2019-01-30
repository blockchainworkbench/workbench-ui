import React from 'react';

export default function LinkElement(props) {
    return <a href={props.content.href}>{props.content.text}</a>;
}