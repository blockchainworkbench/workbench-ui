import React from 'react';

const MyH1 = props => <h1 className='title is-3' {...props}>{props.children}</h1>;
const MyH2 = props => <h2 className='title is-5' {...props}>{props.children}</h2>;
const MyParagraph = props => <p style={{fontSize: '18px', lineHeight: 1.6}} {...props} />;

export default {h1: MyH1, h2: MyH2, p: MyParagraph};