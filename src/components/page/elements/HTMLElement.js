import React from 'react';

export default function HTMLElement(props) {
    return <div dangerouslySetInnerHTML={{__html: props.content}} />;
}