import React from 'react'
import Key from './Key'
import keys from '../modules/keys'
import './KeyPad.css'

export default function KeyPad (props) {
  return (
    <div className="KeyPad">
      {keys().map(data => (
        <Key key={data.id} keyData={data} onClick={props.onClick}/>
      ))}
    </div>
  )
}
