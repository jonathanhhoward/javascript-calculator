import React from 'react';
import handleClear from "../../handlers/handleClear";
import handleDelete from "../../handlers/handleDelete";
import handleOperator from "../../handlers/handleOperator";
import handleEquals from "../../handlers/handleEquals";
import handleDecimal from "../../handlers/handleDecimal";
import handleDigit from "../../handlers/handleDigit";
import { key } from '../../utils';
import './style.scss';

// prettier-ignore
const keys = [
  { id: 'clear', class: 'clear', symbol: key.CLEAR, click: handleClear },
  { id: 'delete', class: 'delete', symbol: key.DELETE, click: handleDelete },
  { id: 'divide', class: 'operator', symbol: key.DIVIDE, click: handleOperator },
  { id: 'multiply', class: 'operator', symbol: key.MULTIPLY, click: handleOperator },
  { id: 'subtract', class: 'operator', symbol: key.SUBTRACT, click: handleOperator },
  { id: 'add', class: 'operator', symbol: key.ADD, click: handleOperator },
  { id: 'equals', class: 'equals', symbol: key.EQUALS, click: handleEquals },
  { id: 'decimal', class: 'digit', symbol: key.DECIMAL, click: handleDecimal },
  { id: 'zero', class: 'digit', symbol: key.ZERO, click: handleDigit },
  { id: 'one', class: 'digit', symbol: key.ONE, click: handleDigit },
  { id: 'two', class: 'digit', symbol: key.TWO, click: handleDigit },
  { id: 'three', class: 'digit', symbol: key.THREE, click: handleDigit },
  { id: 'four', class: 'digit', symbol: key.FOUR, click: handleDigit },
  { id: 'five', class: 'digit', symbol: key.FIVE, click: handleDigit },
  { id: 'six', class: 'digit', symbol: key.SIX, click: handleDigit },
  { id: 'seven', class: 'digit', symbol: key.SEVEN, click: handleDigit },
  { id: 'eight', class: 'digit', symbol: key.EIGHT, click: handleDigit },
  { id: 'nine', class: 'digit', symbol: key.NINE, click: handleDigit },
];

export function KeyPad({ state, dispatch }) {
  const keyPad = keys.map((key) => (
    <button
      key={key.id}
      className={`Key ${key.class}`}
      id={key.id}
      onClick={() => key.click(state, dispatch, key.symbol)}
    >
      {key.symbol}
    </button>
  ));

  return <div className="KeyPad">{keyPad}</div>;
}
