import React from 'react';

export default function LinkElement(props) {
    return <p><a href={props.content.url}>{props.content.text}</a></p>;
}