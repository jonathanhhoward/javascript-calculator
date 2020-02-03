import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
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
    const { getByTestId, getAllByRole } = render(<App/>)
    const EXPRESSION = getByTestId('expression')
    const INPUT = getByTestId('input')
    const buttons = getAllByRole('button')
    const [
      CLEAR, DELETE, DIVIDE, MULTIPLY, SUBTRACT, ADD, EQUALS, DECIMAL,
      ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE
    ] = buttons

    display = { EXPRESSION, INPUT }
    keyPad = {
      CLEAR, DELETE, DIVIDE, MULTIPLY, SUBTRACT, ADD, EQUALS, DECIMAL,
      ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE
    }
  })

  describe('delete', () => {
    test('overwrites current number input with zero', () => {
      const { DELETE, EQUALS, ADD, ONE } = keyPad

      fireClickEvents([ONE, DELETE])

      expectDisplayTextContent(/^0$/, /^0$/)

      fireClickEvents([ADD, DELETE])

      expectDisplayTextContent(/^0\+$/, /^\+$/)

      fireClickEvents([ONE, DELETE])

      expectDisplayTextContent(/^0\+0$/, /^0$/)

      fireClickEvents([ONE, EQUALS, DELETE])

      expectDisplayTextContent(/^0\+1=$/, /^1$/)
    })
  })

  describe('equals', () => {
    test('ignored while result displayed', () => {
      const { EQUALS, ADD, ONE } = keyPad

      fireClickEvents([ONE, ADD, ONE, EQUALS, EQUALS])

      expectDisplayTextContent(/^1\+1=$/, /^2$/)
    })

    test('overwrites operator and negative', () => {
      const { EQUALS, ADD, SUBTRACT } = keyPad

      fireClickEvents([ADD, SUBTRACT])

      expectDisplayTextContent(/^0\+-$/, /^-$/)

      fireClickEvents([EQUALS])

      expectDisplayTextContent(/^0=$/, /^0$/)
    })

    test('overwrites operator', () => {
      const { EQUALS, ADD } = keyPad

      fireClickEvents([ADD])

      expectDisplayTextContent(/^0\+$/, /^\+$/)

      fireClickEvents([EQUALS])

      expectDisplayTextContent(/^0=$/, /^0$/)
    })

    test('appends to expression and displays result', () => {
      const { EQUALS, ADD, ONE } = keyPad

      fireClickEvents([ONE, ADD, ONE, EQUALS])

      expectDisplayTextContent(/^1\+1=$/, /^2$/)
    })
  })

  describe('operators', () => {
    test('overwrites expression and appends to result', () => {
      const { EQUALS, ADD, ONE } = keyPad

      fireClickEvents([ONE, ADD, ONE, EQUALS])

      expectDisplayTextContent(/^1\+1=$/, /^2$/)

      fireClickEvents([ADD])

      expectDisplayTextContent(/^2\+$/, /^\+$/)
    })

    test('overwrites operator and negative', () => {
      const { MULTIPLY, ADD, SUBTRACT } = keyPad

      fireClickEvents([MULTIPLY, SUBTRACT])

      expectDisplayTextContent(/^0\*-$/, /^-$/)

      fireClickEvents([ADD])

      expectDisplayTextContent(/^0\+$/, /^\+$/)
    })

    test('appends negative', () => {
      const { MULTIPLY, SUBTRACT } = keyPad

      fireClickEvents([MULTIPLY, SUBTRACT])

      expectDisplayTextContent(/^0\*-$/, /^-$/)
    })

    test('overwrites operator', () => {
      const { MULTIPLY, ADD } = keyPad

      fireClickEvents([MULTIPLY])

      expectDisplayTextContent(/^0\*$/, /^\*$/)

      fireClickEvents([ADD])

      expectDisplayTextContent(/^0\+$/, /^\+$/)
    })

    test('appends to digits and decimal', () => {
      const { ADD, DECIMAL } = keyPad

      fireClickEvents([ADD, DECIMAL, ADD])

      expectDisplayTextContent(/^0\+0\.\+$/, /^\+$/)
    })
  })

  describe('decimal', () => {
    test('only one per number', () => {
      const { DECIMAL } = keyPad

      fireClickEvents([DECIMAL, DECIMAL])

      expectDisplayTextContent(/^0\.$/, /^0\.$/)
    })

    test('prepends decimal with zero', () => {
      const { ADD, EQUALS, DECIMAL } = keyPad

      fireClickEvents([DECIMAL, ADD, DECIMAL, EQUALS])

      expectDisplayTextContent(/^0\.\+0\.=$/, /^0$/)

      fireClickEvents([DECIMAL])

      expectDisplayTextContent(/^0\.$/, /^0\.$/)
    })
  })

  describe('digits', () => {
    test('limited to 10', () => {
      const { CLEAR, DECIMAL, ONE } = keyPad
      const elevenOnes = new Array(11).fill(ONE)

      fireClickEvents(elevenOnes)

      expectDisplayTextContent(/^1111111111$/, /^1111111111$/)

      fireClickEvents([CLEAR, DECIMAL, ...elevenOnes])

      expectDisplayTextContent(/^0.111111111$/, /^0.111111111$/)
    })

    test('overwrites expression and result', () => {
      const { EQUALS, ONE } = keyPad

      fireClickEvents([EQUALS])

      expectDisplayTextContent(/^0=$/, /^0$/)

      fireClickEvents([ONE])

      expectDisplayTextContent(/^1$/, /^1$/)
    })

    test('appends to operator', () => {
      const { ADD, ONE } = keyPad

      fireClickEvents([ADD, ONE])

      expectDisplayTextContent(/^0\+1$/, /^1$/)
    })

    test('ignores leading zeros', () => {
      const { ZERO, ONE } = keyPad

      fireClickEvents([ZERO, ONE])

      expectDisplayTextContent(/^1$/, /^1$/)
    })

    test('appends to digits and decimal', () => {
      const { DECIMAL, ONE } = keyPad

      fireClickEvents([DECIMAL, ONE, ONE])

      expectDisplayTextContent(/^0\.11$/, /^0\.11$/)
    })
  })
})
