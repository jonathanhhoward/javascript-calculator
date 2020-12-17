import React from 'react';
import { key } from '../../utils';
import './style.scss';

const keys = [
  { id: 'clear', class: 'clear', value: key.CLEAR },
  { id: 'delete', class: 'delete', value: key.DELETE },
  { id: 'divide', class: 'operator', value: key.DIVIDE },
  { id: 'multiply', class: 'operator', value: key.MULTIPLY },
  { id: 'subtract', class: 'operator', value: key.SUBTRACT },
  { id: 'add', class: 'operator', value: key.ADD },
  { id: 'equals', class: 'equals', value: key.EQUALS },
  { id: 'decimal', class: 'digit', value: key.DECIMAL },
  { id: 'zero', class: 'digit', value: key.ZERO },
  { id: 'one', class: 'digit', value: key.ONE },
  { id: 'two', class: 'digit', value: key.TWO },
  { id: 'three', class: 'digit', value: key.THREE },
  { id: 'four', class: 'digit', value: key.FOUR },
  { id: 'five', class: 'digit', value: key.FIVE },
  { id: 'six', class: 'digit', value: key.SIX },
  { id: 'seven', class: 'digit', value: key.SEVEN },
  { id: 'eight', class: 'digit', value: key.EIGHT },
  { id: 'nine', class: 'digit', value: key.NINE },
];

export function KeyPad({ onClick }) {
  const keyPad = keys.map((key) => (
    <button
      key={key.id}
      className={'Key ' + key.class}
      id={key.id}
      onClick={onClick}
      type="button"
      value={key.value}
    >
      {key.value}
    </button>
  ));

  return <div className="KeyPad">{keyPad}</div>;
}
