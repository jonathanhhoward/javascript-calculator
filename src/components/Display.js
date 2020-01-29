import React from 'react'
import './Display.css'

export default function Display (props) {
  const { expression, input } = props

  return (
    <div className="Display">
      <div className="Expression">{expression}</div>
      <div className="Input" id="display" data-testid="input">{input}</div>
    </div>
  )
}
