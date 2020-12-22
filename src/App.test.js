import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { App } from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('display on key click', () => {
  let display;
  let keyPad;

  function fireClickEvents(nodes) {
    nodes.forEach((node) => fireEvent.click(node));
  }

  function expectDisplayTextContent(expr, inpt) {
    expect(display.EXPRESSION).toHaveTextContent(expr);
    expect(display.INPUT).toHaveTextContent(inpt);
  }

  beforeEach(() => {
    const { getByText, getAllByText } = render(<App />);
    const zeros = getAllByText('0');
    display = Object.freeze({
      EXPRESSION: zeros[0],
      INPUT: zeros[1],
    });
    keyPad = Object.freeze({
      CLEAR: getByText('AC'),
      DELETE: getByText('C'),
      DIVIDE: getByText('/'),
      MULTIPLY: getByText('*'),
      SUBTRACT: getByText('-'),
      ADD: getByText('+'),
      EQUALS: getByText('='),
      DECIMAL: getByText('.'),
      ZERO: zeros[2],
      ONE: getByText('1'),
      TWO: getByText('2'),
      THREE: getByText('3'),
      FOUR: getByText('4'),
      FIVE: getByText('5'),
      SIX: getByText('6'),
      SEVEN: getByText('7'),
      EIGHT: getByText('8'),
      NINE: getByText('9'),
    });
  });

  describe('delete', () => {
    test('ignores equals, negative with operator, and operator', () => {
      const { DELETE, SUBTRACT, ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, DELETE]);
      expectDisplayTextContent(/^1\+$/, /^\+$/);

      fireClickEvents([SUBTRACT, DELETE]);
      expectDisplayTextContent(/^1\+-$/, /^-$/);

      fireClickEvents([EQUALS, DELETE]);
      expectDisplayTextContent(/^1=$/, /^1$/);
    });

    test('overwrites current number input with zero', () => {
      const { DELETE, SUBTRACT, ADD, ONE } = keyPad;

      fireClickEvents([ONE, DELETE]);
      expectDisplayTextContent(/^0$/, /^0$/);

      fireClickEvents([ADD, ONE, DELETE]);
      expectDisplayTextContent(/^0\+0$/, /^0$/);

      fireClickEvents([ADD, SUBTRACT, ONE, DELETE]);
      expectDisplayTextContent(/^0\+0\+0$/, /^0$/);
    });
  });

  describe('equals', () => {
    test('ignored while result displayed', () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS, EQUALS]);
      expectDisplayTextContent(/^1\+1=$/, /^2$/);
    });

    test('overwrites operator and negative', () => {
      const { SUBTRACT, ADD, EQUALS } = keyPad;

      fireClickEvents([ADD, SUBTRACT]);
      expectDisplayTextContent(/^0\+-$/, /^-$/);

      fireClickEvents([EQUALS]);
      expectDisplayTextContent(/^0=$/, /^0$/);
    });

    test('overwrites operator', () => {
      const { ADD, EQUALS } = keyPad;

      fireClickEvents([ADD]);
      expectDisplayTextContent(/^0\+$/, /^\+$/);

      fireClickEvents([EQUALS]);
      expectDisplayTextContent(/^0=$/, /^0$/);
    });

    test('appends to expression and displays result', () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS]);
      expectDisplayTextContent(/^1\+1=$/, /^2$/);
    });
  });

  describe('operators', () => {
    test('overwrites expression and appends to result', () => {
      const { ADD, EQUALS, ONE } = keyPad;

      fireClickEvents([ONE, ADD, ONE, EQUALS]);
      expectDisplayTextContent(/^1\+1=$/, /^2$/);

      fireClickEvents([ADD]);
      expectDisplayTextContent(/^2\+$/, /^\+$/);
    });

    test('overwrites operator and negative', () => {
      const { MULTIPLY, SUBTRACT, ADD } = keyPad;

      fireClickEvents([MULTIPLY, SUBTRACT]);
      expectDisplayTextContent(/^0\*-$/, /^-$/);

      fireClickEvents([ADD]);
      expectDisplayTextContent(/^0\+$/, /^\+$/);
    });

    test('appends negative', () => {
      const { MULTIPLY, SUBTRACT } = keyPad;

      fireClickEvents([MULTIPLY, SUBTRACT]);
      expectDisplayTextContent(/^0\*-$/, /^-$/);
    });

    test('overwrites operator', () => {
      const { MULTIPLY, ADD } = keyPad;

      fireClickEvents([MULTIPLY]);
      expectDisplayTextContent(/^0\*$/, /^\*$/);

      fireClickEvents([ADD]);
      expectDisplayTextContent(/^0\+$/, /^\+$/);
    });

    test('appends to digits and decimal', () => {
      const { ADD, DECIMAL } = keyPad;

      fireClickEvents([ADD, DECIMAL, ADD]);
      expectDisplayTextContent(/^0\+0\.\+$/, /^\+$/);
    });
  });

  describe('decimal', () => {
    test('only one per number', () => {
      const { DECIMAL, ONE } = keyPad;

      fireClickEvents([ONE, DECIMAL, DECIMAL]);
      expectDisplayTextContent(/^1\.$/, /^1\.$/);
    });

    test('prepends decimal with zero', () => {
      const { SUBTRACT, ADD, EQUALS, DECIMAL } = keyPad;

      fireClickEvents([DECIMAL, ADD, DECIMAL, ADD, SUBTRACT, DECIMAL]);
      expectDisplayTextContent(/^0\.\+0\.\+-0\.$/, /^-0\.$/);

      fireClickEvents([EQUALS, DECIMAL]);
      expectDisplayTextContent(/^0\.$/, /^0\.$/);
    });
  });

  describe('digits', () => {
    test('limited to 10', () => {
      const { CLEAR, SUBTRACT, ADD, EQUALS, DECIMAL, ONE } = keyPad;
      const elevenOnes = new Array(11).fill(ONE);

      fireClickEvents(elevenOnes);
      expectDisplayTextContent(/^1111111111$/, /^1111111111$/);

      fireClickEvents([CLEAR, ADD, SUBTRACT, ...elevenOnes]);
      expectDisplayTextContent(/^0\+-1111111111$/, /^-1111111111$/);

      fireClickEvents([CLEAR, DECIMAL, ...elevenOnes]);
      expectDisplayTextContent(/^0\.111111111$/, /^0\.111111111$/);

      fireClickEvents([CLEAR, ADD, SUBTRACT, DECIMAL, ...elevenOnes]);
      expectDisplayTextContent(/^0\+-0\.111111111$/, /^-0\.111111111$/);

      fireClickEvents([EQUALS, ONE]);
      expectDisplayTextContent(/^1$/, /^1$/);
    });

    test('overwrites expression and result', () => {
      const { EQUALS, ONE } = keyPad;

      fireClickEvents([EQUALS]);
      expectDisplayTextContent(/^0=$/, /^0$/);

      fireClickEvents([ONE]);
      expectDisplayTextContent(/^1$/, /^1$/);
    });

    test('appends to negative', () => {
      const { SUBTRACT, ADD, ONE } = keyPad;

      fireClickEvents([ADD, SUBTRACT, ONE]);
      expectDisplayTextContent(/^0\+-1$/, /^-1$/);
    });

    test('appends to operator', () => {
      const { ADD, ONE } = keyPad;

      fireClickEvents([ADD, ONE]);
      expectDisplayTextContent(/^0\+1$/, /^1$/);
    });

    test('ignores leading zeros', () => {
      const { ZERO, ONE } = keyPad;

      fireClickEvents([ZERO, ONE]);
      expectDisplayTextContent(/^1$/, /^1$/);
    });

    test('appends to digits and decimal', () => {
      const { DECIMAL, ONE } = keyPad;

      fireClickEvents([DECIMAL, ONE, ONE]);
      expectDisplayTextContent(/^0\.11$/, /^0\.11$/);
    });
  });
});
