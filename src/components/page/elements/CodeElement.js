import React from 'react';

export default function CodeElement(props) {
    if(typeof(props.content) === "string") {
        return <code>{props.content}</code>;
    } else {
        return props.content.map((itm, idx) => <code key={idx}>{itm}</code>);
    }
}
