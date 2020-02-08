import React from 'react'
import Key from './Key'
import keys from '../modules/keys'
import './KeyPad.css'

export default function KeyPad (props) {
  return (
    <div className="KeyPad">
      {keys().map(obj => (
        <Key key={obj.id} obj={obj} onClick={props.onClick}/>
      ))}
    </div>
  )
}
