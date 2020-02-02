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

describe('display on key press', () => {
  let display
  let keyPad

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

  describe('operators', () => {
    test('carry over last result', () => {
      fireEvent.click(keyPad.ONE)
      fireEvent.click(keyPad.ADD)
      fireEvent.click(keyPad.ONE)
      fireEvent.click(keyPad.EQUALS)

      expect(display.EXPRESSION).toHaveTextContent(/^1\+1=$/)
      expect(display.INPUT).toHaveTextContent(/^2$/)

      fireEvent.click(keyPad.ADD)

      expect(display.EXPRESSION).toHaveTextContent(/^2\+$/)
      expect(display.INPUT).toHaveTextContent(/^\+$/)
    })

    test('cancels negative', () => {
      fireEvent.click(keyPad.MULTIPLY)
      fireEvent.click(keyPad.SUBTRACT)

      expect(display.EXPRESSION).toHaveTextContent(/^0\*-$/)
      expect(display.INPUT).toHaveTextContent(/^-$/)

      fireEvent.click(keyPad.ADD)

      expect(display.EXPRESSION).toHaveTextContent(/^0\+$/)
      expect(display.INPUT).toHaveTextContent(/^\+$/)
    })

    test('adds negative', () => {
      fireEvent.click(keyPad.MULTIPLY)
      fireEvent.click(keyPad.SUBTRACT)

      expect(display.EXPRESSION).toHaveTextContent(/^0\*-$/)
      expect(display.INPUT).toHaveTextContent(/^-$/)
    })

    test('overwrites previous', () => {
      fireEvent.click(keyPad.MULTIPLY)

      expect(display.EXPRESSION).toHaveTextContent(/^0\*$/)
      expect(display.INPUT).toHaveTextContent(/^\*$/)

      fireEvent.click(keyPad.ADD)

      expect(display.EXPRESSION).toHaveTextContent(/^0\+$/)
      expect(display.INPUT).toHaveTextContent(/^\+$/)
    })
  })

  describe('decimal', () => {
    test('prevents multiple decimals', () => {
      fireEvent.click(keyPad.DECIMAL)
      fireEvent.click(keyPad.DECIMAL)

      expect(display.EXPRESSION).toHaveTextContent(/^0\.$/)
      expect(display.INPUT).toHaveTextContent(/^0\.$/)
    })

    test('prepends decimal with zero', () => {
      fireEvent.click(keyPad.DECIMAL)
      fireEvent.click(keyPad.ADD)
      fireEvent.click(keyPad.DECIMAL)
      fireEvent.click(keyPad.EQUALS)

      expect(display.EXPRESSION).toHaveTextContent(/^0\.\+0\.=$/)
      expect(display.INPUT).toHaveTextContent(/^0$/)

      fireEvent.click(keyPad.DECIMAL)

      expect(display.EXPRESSION).toHaveTextContent(/^0\.$/)
      expect(display.INPUT).toHaveTextContent(/^0\.$/)
    })
  })

  describe('digits', () => {
    test('has 10 digit limit', () => {
      for (let i = 0; i < 11; ++i) fireEvent.click(keyPad.ONE)

      expect(display.EXPRESSION).toHaveTextContent(/^1111111111$/)
      expect(display.INPUT).toHaveTextContent(/^1111111111$/)

      fireEvent.click(keyPad.CLEAR)
      fireEvent.click(keyPad.DECIMAL)
      for (let i = 0; i < 10; ++i) fireEvent.click(keyPad.ONE)

      expect(display.EXPRESSION).toHaveTextContent(/^0.111111111$/)
      expect(display.INPUT).toHaveTextContent(/^0.111111111$/)
    })

    test('overwrites result', () => {
      fireEvent.click(keyPad.EQUALS)

      expect(display.EXPRESSION).toHaveTextContent(/^0=$/)
      expect(display.INPUT).toHaveTextContent(/^0$/)

      fireEvent.click(keyPad.ONE)

      expect(display.EXPRESSION).toHaveTextContent(/^1$/)
      expect(display.INPUT).toHaveTextContent(/^1$/)
    })

    test('concatenates to operator', () => {
      fireEvent.click(keyPad.ADD)
      fireEvent.click(keyPad.ONE)

      expect(display.EXPRESSION).toHaveTextContent(/^0\+1$/)
      expect(display.INPUT).toHaveTextContent(/^1$/)
    })

    test('prevents leading zeros', () => {
      fireEvent.click(keyPad.ZERO)
      fireEvent.click(keyPad.ONE)

      expect(display.EXPRESSION).toHaveTextContent(/^1$/)
      expect(display.INPUT).toHaveTextContent(/^1$/)
    })

    test('concatenates to digits and decimal', () => {
      fireEvent.click(keyPad.DECIMAL)
      fireEvent.click(keyPad.ONE)
      fireEvent.click(keyPad.ONE)

      expect(display.EXPRESSION).toHaveTextContent(/^0\.11$/)
      expect(display.INPUT).toHaveTextContent(/^0\.11$/)
    })
  })
})
