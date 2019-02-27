import React from 'react';
import ContentArray from "../ContentArray";

export default function ListItemElement(props) {
    return <li><ContentArray content={props.content}/></li>;
}
