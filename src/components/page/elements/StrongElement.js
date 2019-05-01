import React from 'react'
import ContentArray from '../ContentArray'

export default function StrongElement(props) {
  return (
    <strong>
      <ContentArray content={props.content} />
    </strong>
  )
}
