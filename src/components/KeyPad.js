import React from 'react'
import Key from './Key'
import * as KEY from '../modules/key-constants'
import './KeyPad.css'

const keysData = [
  { id: 'clear', class: 'clear', value: KEY.CLEAR },
  { id: 'delete', class: 'delete', value: KEY.DELETE },
  { id: 'divide', class: 'operator', value: KEY.DIVIDE },
  { id: 'multiply', class: 'operator', value: KEY.MULTIPLY },
  { id: 'subtract', class: 'operator', value: KEY.SUBTRACT },
  { id: 'add', class: 'operator', value: KEY.ADD },
  { id: 'equals', class: 'equals', value: KEY.EQUALS },
  { id: 'decimal', class: 'digit', value: KEY.DECIMAL },
  { id: 'zero', class: 'digit', value: KEY.ZERO },
  { id: 'one', class: 'digit', value: KEY.ONE },
  { id: 'two', class: 'digit', value: KEY.TWO },
  { id: 'three', class: 'digit', value: KEY.THREE },
  { id: 'four', class: 'digit', value: KEY.FOUR },
  { id: 'five', class: 'digit', value: KEY.FIVE },
  { id: 'six', class: 'digit', value: KEY.SIX },
  { id: 'seven', class: 'digit', value: KEY.SEVEN },
  { id: 'eight', class: 'digit', value: KEY.EIGHT },
  { id: 'nine', class: 'digit', value: KEY.NINE }
]

export default function KeyPad (props) {
  return (
    <div className="KeyPad">
      {keysData.map(data => (
        <Key key={data.id} keyData={data} onClick={props.onClick}/>
      ))}
    </div>
  )
}
