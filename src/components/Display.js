import React from 'react'
import './Display.css'

export default function Display (props) {
  return (
    <div className="Display">
      <div className="Expression">{props.expression}</div>
      <div id="display" className="Input">{props.input}</div>
    </div>
  )
}
