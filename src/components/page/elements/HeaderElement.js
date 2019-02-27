import React from 'react';
import ContentArray from "../ContentArray";

export default function HeaderElement(props) {
    let classes = '';
    switch (props.type) {
        case "h1":
            classes = "title is-2";
            break;
        case "h2":
            classes = "subtitle is-4";
            break;
        case "h3":
            classes = "subtitle is-5";
            break;
        case "h4":
        case "h5":
        case "h6":
            classes = "subtitle is-6";
            break;
        default:
            console.log(`Unknown header type ${props.type}`);
            classes = "has-text-danger";
            break;
    }

    let children = '';
    if (typeof (props.content) === 'string') {
        children = props.content;
    } else {
        children = <ContentArray content={props.content}/>;
    }
    return React.createElement(props.type, {
        'children': children, 'className': classes
    });
}
