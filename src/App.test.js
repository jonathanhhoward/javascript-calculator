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
      CLEAR, DELETE, DIVIDE, MULTIPLY, SUBTRACT, ADD, EQUALS, DECIMAL, ZERO,
      ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE
    ] = buttons

    display = { EXPRESSION, INPUT }
    keyPad = {
      CLEAR, DELETE, DIVIDE, MULTIPLY, SUBTRACT, ADD, EQUALS, DECIMAL,
      ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE
    }
  })

  describe('operators', () => {
    test('uses last operator clicked', () => {
      fireEvent.click(keyPad.ONE)
      fireEvent.click(keyPad.MULTIPLY)
      fireEvent.click(keyPad.ADD)

      expect(display.EXPRESSION).toHaveTextContent(/^1\+$/)
      expect(display.INPUT).toHaveTextContent(/^\+$/)
    })

    test('uses negative on operator followed by minus', () => {
      fireEvent.click(keyPad.ONE)
      fireEvent.click(keyPad.MULTIPLY)
      fireEvent.click(keyPad.SUBTRACT)

      expect(display.EXPRESSION).toHaveTextContent(/^1\*-$/)
      expect(display.INPUT).toHaveTextContent(/^-$/)
    })

    test('uses subtraction on negative followed by minus', () => {
      fireEvent.click(keyPad.ONE)
      fireEvent.click(keyPad.MULTIPLY)
      fireEvent.click(keyPad.SUBTRACT)
      fireEvent.click(keyPad.SUBTRACT)

      expect(display.EXPRESSION).toHaveTextContent(/^1-$/)
      expect(display.INPUT).toHaveTextContent(/^-$/)
    })
  })

  describe('digits', () => {
    test('prevents leading zeros', () => {
      fireEvent.click(keyPad.ZERO)
      fireEvent.click(keyPad.ONE)

      expect(display.EXPRESSION).toHaveTextContent(/^1$/)
      expect(display.INPUT).toHaveTextContent(/^1$/)
    })

    test('prevents multiple decimals', () => {
      fireEvent.click(keyPad.DECIMAL)
      fireEvent.click(keyPad.DECIMAL)

      expect(display.EXPRESSION).toHaveTextContent(/^0\.$/)
      expect(display.INPUT).toHaveTextContent(/^0\.$/)
    })

    test('prepends decimal with zero', () => {
      fireEvent.click(keyPad.DECIMAL)

      expect(display.EXPRESSION).toHaveTextContent(/^0\.$/)
      expect(display.INPUT).toHaveTextContent(/^0\.$/)

      fireEvent.click(keyPad.ADD)
      fireEvent.click(keyPad.DECIMAL)

      expect(display.EXPRESSION).toHaveTextContent(/^0\.\+0\.$/)
      expect(display.INPUT).toHaveTextContent(/^0\.$/)

      fireEvent.click(keyPad.EQUALS)
      fireEvent.click(keyPad.DECIMAL)

      expect(display.EXPRESSION).toHaveTextContent(/^0\.$/)
      expect(display.INPUT).toHaveTextContent(/^0\.$/)
    })
  })
})
