import React from 'react'
import './Display.css'

export default function Display (props) {
  const { expression, input } = props

  return (
    <div className="Display">
      <div className="Expression" data-testid="expression">{expression}</div>
      <div id="display" className="Input" data-testid="input">{input}</div>
    </div>
  )
}
