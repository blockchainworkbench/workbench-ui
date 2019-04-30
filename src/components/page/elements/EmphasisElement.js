import React from 'react'
import ContentArray from '../ContentArray'

export default function EmphasisElement(props) {
  return (
    <em>
      <ContentArray content={props.content} />
    </em>
  )
}
