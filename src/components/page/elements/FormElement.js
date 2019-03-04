import React from 'react';
import ContentArray from "../ContentArray";

export default function FormElement(props) {
    return <form><ContentArray content={props.content}/></form>;
}
