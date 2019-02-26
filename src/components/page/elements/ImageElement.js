import React from 'react';

export default function ImageElement(props) {
    console.log('image', props.elem, 'xxx');
    return <img className={props.elem.class}
                src={props.elem.src} alt={props.elem.alt} style={{'height': props.elem.height}}
    />;
}
