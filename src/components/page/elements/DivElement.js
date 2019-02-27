import React from 'react';
import ContentArray from "../ContentArray";

export default function DivElement(props) {
    return <div className={props.element.class}><ContentArray content={props.content}/></div>;
}
