import React from 'react'

export default function ImageElement(props) {
  let src = props.element.src
  if (!src.startsWith('http')) {
    src = `${process.env.REACT_APP_JSONFEED_BASE}${props.element.src}`
  }
  return (
    <img className={props.element.class} src={src} alt={props.element.alt} style={{ height: props.element.height }} />
  )
}
