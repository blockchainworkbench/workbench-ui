import React from 'react';
import ListItemElement from './ListItemElement';

export default function ListElement(props) {
    let children = props.content.map((li, idx) => <ListItemElement key={idx} content={li.content}/>);
    return React.createElement(props.type, {'children': children});
}
