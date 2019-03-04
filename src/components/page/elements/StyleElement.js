import React from 'react';

export default function StyleElement(props) {
    return props.content.map(content => {
        return <style>{content}</style>;
    });
}
