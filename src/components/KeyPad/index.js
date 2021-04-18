import {
  handleClear,
  handleDecimal,
  handleDelete,
  handleDigit,
  handleEquals,
  handleOperator,
} from "handlers";
import { KEY } from "utils";
import "./style.scss";

// prettier-ignore
const keys = [
  { id: 'clear', class: 'clear', symbol: KEY.CLEAR, click: handleClear },
  { id: 'delete', class: 'delete', symbol: KEY.DELETE, click: handleDelete },
  { id: 'divide', class: 'operator', symbol: KEY.DIVIDE, click: handleOperator },
  { id: 'multiply', class: 'operator', symbol: KEY.MULTIPLY, click: handleOperator },
  { id: 'subtract', class: 'operator', symbol: KEY.SUBTRACT, click: handleOperator },
  { id: 'add', class: 'operator', symbol: KEY.ADD, click: handleOperator },
  { id: 'equals', class: 'equals', symbol: KEY.EQUALS, click: handleEquals },
  { id: 'decimal', class: 'digit', symbol: KEY.DECIMAL, click: handleDecimal },
  { id: 'zero', class: 'digit', symbol: KEY.ZERO, click: handleDigit },
  { id: 'one', class: 'digit', symbol: KEY.ONE, click: handleDigit },
  { id: 'two', class: 'digit', symbol: KEY.TWO, click: handleDigit },
  { id: 'three', class: 'digit', symbol: KEY.THREE, click: handleDigit },
  { id: 'four', class: 'digit', symbol: KEY.FOUR, click: handleDigit },
  { id: 'five', class: 'digit', symbol: KEY.FIVE, click: handleDigit },
  { id: 'six', class: 'digit', symbol: KEY.SIX, click: handleDigit },
  { id: 'seven', class: 'digit', symbol: KEY.SEVEN, click: handleDigit },
  { id: 'eight', class: 'digit', symbol: KEY.EIGHT, click: handleDigit },
  { id: 'nine', class: 'digit', symbol: KEY.NINE, click: handleDigit },
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
