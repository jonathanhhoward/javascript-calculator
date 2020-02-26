import React from 'react'
import './Display.css'

export default function Display (props) {
  return (
    <div className="Display">
      <div className="Expression" data-testid="expression">
        {props.expression}
      </div>
      <div id="display" className="Input" data-testid="input">
        {props.input}
      </div>
    </div>
  )
}
