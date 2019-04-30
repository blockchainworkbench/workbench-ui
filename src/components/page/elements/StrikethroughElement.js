import React from 'react'
import ContentArray from '../ContentArray'

export default function StrikethroughElement(props) {
  return (
    <del>
      <ContentArray content={props.content} />
    </del>
  )
}
