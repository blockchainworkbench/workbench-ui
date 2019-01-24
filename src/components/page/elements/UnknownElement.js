import React from 'react';

export default function UnknownElement(props) {
    return <p className='has-background-danger has-text-white'>Unknown element type {props.type}</p>;
}