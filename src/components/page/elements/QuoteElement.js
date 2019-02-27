import React from 'react';
import ContentArray from "../ContentArray";

export default function QuoteElement(props) {
    return <div className="notification is-primary mb30"><ContentArray content={props.content}/></div>;
}
