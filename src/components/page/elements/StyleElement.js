import React from 'react';

export default function StyleElement(props) {
    return props.content.map((content, idx) => {
        return <style key={idx}>{content}</style>;
    });
}
