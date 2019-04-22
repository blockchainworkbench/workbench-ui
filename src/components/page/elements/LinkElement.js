import React from 'react'
import ContentArray from '../ContentArray'

export default function LinkElement(props) {
  return (
    <a
      href={props.element.href}
      target={props.element.target ? props.element.target : '_blank'}
      rel={'noopener noreferrer'}
      className={props.element.class}
    >
      <ContentArray content={props.content} />
    </a>
  )
}
