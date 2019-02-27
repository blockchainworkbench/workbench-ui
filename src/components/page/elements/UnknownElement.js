import React from 'react';

export default function UnknownElement(props) {
    return <span className='has-background-danger has-text-white'>Unknown element type {props.type}</span>;
}
