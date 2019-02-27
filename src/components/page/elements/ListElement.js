import React from 'react';
import ListItemElement from './ListItemElement';

export default function ListElement(props) {
    return <ul>{props.content.map((li, idx) => <ListItemElement key={idx} content={li.content} />)}</ul>;
}
