import React from 'react';
import ContentArray from "../ContentArray";

export default function ParagraphElement(props) {
    return <p><ContentArray content={props.content}/></p>;
}
