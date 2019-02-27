import React from 'react';

export default function ImageElement(props) {
    return <img className={props.element.class}
                src={`https://achievement.network/${props.element.src}`} alt={props.element.alt} style={{'height': props.element.height}}
    />;
}
