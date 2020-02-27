import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import * as KEY from './modules/key-constants'
import App from './App'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App/>, div)
  ReactDOM.unmountComponentAtNode(div)
})

describe('display on key click', () => {
  let display
  let keyPad

  function fireClickEvents (nodes) {
    nodes.forEach(node => fireEvent.click(node))
  }

  function expectDisplayTextContent (expr, inpt) {
    expect(display.EXPRESSION).toHaveTextContent(expr)
    expect(display.INPUT).toHaveTextContent(inpt)
  }

  beforeEach(() => {
    const { getByTestId, getByText, getAllByText } = render(<App/>)
    const EXPRESSION = getByTestId('expression')
    const INPUT = getByTestId('input')
    const CLEAR = getByText(KEY.CLEAR)
    const DELETE = getByText(KEY.DELETE)
    const DIVIDE = getByText(KEY.DIVIDE)
    const MULTIPLY = getByText(KEY.MULTIPLY)
    const SUBTRACT = getByText(KEY.SUBTRACT)
    const ADD = getByText(KEY.ADD)
    const EQUALS = getByText(KEY.EQUALS)
    const NEGATE = getByText(KEY.NEGATE)
    const DECIMAL = getByText(KEY.DECIMAL)
    const ZERO = getAllByText(KEY.ZERO)[1]
    const ONE = getByText(KEY.ONE)
    const TWO = getByText(KEY.TWO)
    const THREE = getByText(KEY.THREE)
    const FOUR = getByText(KEY.FOUR)
    const FIVE = getByText(KEY.FIVE)
    const SIX = getByText(KEY.SIX)
    const SEVEN = getByText(KEY.SEVEN)
    const EIGHT = getByText(KEY.EIGHT)
    const NINE = getByText(KEY.NINE)

    display = { EXPRESSION, INPUT }
    keyPad = {
      CLEAR, DELETE, DIVIDE, MULTIPLY, SUBTRACT, ADD, EQUALS, NEGATE, DECIMAL,
      ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE
    }
  })

  describe('delete', () => {
    test('ignores equals and operator', () => {
      const { DELETE, ADD, EQUALS, ONE } = keyPad

      fireClickEvents([ONE, ADD, DELETE])
      expectDisplayTextContent(/^1\+$/, /^1$/)

      fireClickEvents([EQUALS, DELETE])
      expectDisplayTextContent(/^1=$/, /^1$/)
    })

    test('overwrites input with zero', () => {
      const { DELETE, ADD, ONE } = keyPad

      fireClickEvents([ONE])
      expectDisplayTextContent(/^$/, /^1$/)

      fireClickEvents([DELETE])
      expectDisplayTextContent(/^$/, /^0$/)

      fireClickEvents([ADD, ONE])
      expectDisplayTextContent(/^0\+$/, /^1$/)

      fireClickEvents([DELETE])
      expectDisplayTextContent(/^0\+$/, /^0$/)
    })
  })

  describe('equals', () => {
    test('ignored while result displayed', () => {
      const { ADD, EQUALS, ONE } = keyPad

      fireClickEvents([ONE, ADD, ONE, EQUALS, EQUALS])
      expectDisplayTextContent(/^1\+1=$/, /^2$/)
    })

    test('overwrites operator', () => {
      const { ADD, EQUALS } = keyPad

      fireClickEvents([ADD])
      expectDisplayTextContent(/^0\+$/, /^0$/)

      fireClickEvents([EQUALS])
      expectDisplayTextContent(/^0=$/, /^0$/)
    })

    test('appends to expression and displays result', () => {
      const { ADD, EQUALS, ONE } = keyPad

      fireClickEvents([ONE, ADD, ONE, EQUALS])
      expectDisplayTextContent(/^1\+1=$/, /^2$/)
    })
  })

  describe('operators', () => {
    test('overwrites expression and appends to result', () => {
      const { ADD, EQUALS, ONE } = keyPad

      fireClickEvents([ONE, ADD, ONE, EQUALS])
      expectDisplayTextContent(/^1\+1=$/, /^2$/)

      fireClickEvents([ADD])
      expectDisplayTextContent(/^2\+$/, /^2$/)
    })

    test('overwrites operator', () => {
      const { MULTIPLY, ADD } = keyPad

      fireClickEvents([MULTIPLY])
      expectDisplayTextContent(/^0\*$/, /^0$/)

      fireClickEvents([ADD])
      expectDisplayTextContent(/^0\+$/, /^0$/)
    })

    test('appends to digits and decimal', () => {
      const { ADD, DECIMAL } = keyPad

      fireClickEvents([ADD, DECIMAL, ADD])
      expectDisplayTextContent(/^0\+0\.\+$/, /^0.$/)
    })
  })

  describe('negate', () => {
    test('ignored when operator or result is present', () => {
      const { ADD, EQUALS, NEGATE, ONE } = keyPad

      fireClickEvents([ONE, ADD, NEGATE])
      expectDisplayTextContent(/^1\+$/, /^1$/)

      fireClickEvents([EQUALS, NEGATE])
      expectDisplayTextContent(/^1=$/, /^1$/)
    })

    test('removes negative from digits', () => {
      const { NEGATE, ONE } = keyPad

      fireClickEvents([ONE, NEGATE])
      expectDisplayTextContent(/^$/, /^-1$/)

      fireClickEvents([NEGATE])
      expectDisplayTextContent(/^$/, /^1$/)
    })

    test('prepends negative to digits', () => {
      const { NEGATE, ONE } = keyPad

      fireClickEvents([ONE, NEGATE])
      expectDisplayTextContent(/^$/, /^-1$/)
    })
  })

  describe('decimal', () => {
    test('only one per number', () => {
      const { DECIMAL } = keyPad

      fireClickEvents([DECIMAL, DECIMAL])
      expectDisplayTextContent(/^$/, /^0\.$/)
    })

    test('prepends decimal with zero', () => {
      const { ADD, EQUALS, DECIMAL} = keyPad

      fireClickEvents([DECIMAL])
      expectDisplayTextContent(/^$/, /^0\.$/)

      fireClickEvents([ADD, DECIMAL, EQUALS])
      expectDisplayTextContent(/^0\.\+0\.=$/, /^0$/)

      fireClickEvents([DECIMAL])
      expectDisplayTextContent(/^$/, /^0\.$/)
    })
  })

  describe('digits', () => {
    test('limited to 10', () => {
      const { CLEAR, NEGATE, DECIMAL, ONE } = keyPad
      const elevenOnes = new Array(11).fill(ONE)

      fireClickEvents(elevenOnes)
      expectDisplayTextContent(/^$/, /^1111111111$/)

      fireClickEvents([CLEAR, ONE, NEGATE, ...elevenOnes])
      expectDisplayTextContent(/^$/,/^-1111111111$/)

      fireClickEvents([CLEAR, DECIMAL, ...elevenOnes])
      expectDisplayTextContent(/^$/, /^0\.111111111$/)

      fireClickEvents([CLEAR, DECIMAL, ONE, NEGATE, ...elevenOnes])
      expectDisplayTextContent(/^$/, /^-0\.111111111$/)
    })

    test('overwrites result and clears expression', () => {
      const { EQUALS, ONE } = keyPad

      fireClickEvents([EQUALS])
      expectDisplayTextContent(/^0=$/, /^0$/)

      fireClickEvents([ONE])
      expectDisplayTextContent(/^$/, /^1$/)
    })

    test('overwrites after operator', () => {
      const { ADD, ONE, TWO } = keyPad

      fireClickEvents([ONE, ADD])
      expectDisplayTextContent(/^1\+$/, /^1$/)

      fireClickEvents([TWO])
      expectDisplayTextContent(/^1\+$/, /^2$/)
    })

    test('overwrites zero', () => {
      const { ONE } = keyPad

      expectDisplayTextContent(/^$/, /^0$/)

      fireClickEvents([ONE])
      expectDisplayTextContent(/^$/, /^1$/)
    })

    test('appends digits to input', () => {
      const { ONE } = keyPad

      fireClickEvents([ONE, ONE])
      expectDisplayTextContent(/^$/, /^11$/)
    })
  })
})
