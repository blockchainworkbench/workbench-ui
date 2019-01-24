import React from 'react';

export default function HTMLElement(props) {
    return <iframe src={`https://www.youtube.com/embed/${props.content.id}`}
                   frameBorder="0" width="1280" height="720"
                   title={props.content.title}
                   allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
    </iframe>;
}