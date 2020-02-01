import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

let testObj = {}

beforeEach(() => {
  const { getByTestId, getAllByRole } = render(<App/>)
  const EXPRESSION = getByTestId('expression')
  const INPUT = getByTestId('input')
  const buttons = getAllByRole('button')
  const [
    CLEAR, DELETE, DIVIDE, MULTIPLY, SUBTRACT, ADD, EQUALS, DECIMAL, ZERO,
    ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE
  ] = buttons

  testObj = {
    EXPRESSION, INPUT, CLEAR, DELETE, DIVIDE, MULTIPLY, SUBTRACT, ADD,
    EQUALS, DECIMAL, ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE
  }
})

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App/>, div)
  ReactDOM.unmountComponentAtNode(div)
})

test('prevents leading zeros', () => {
  fireEvent.click(testObj.ZERO)
  fireEvent.click(testObj.ONE)

  expect(testObj.EXPRESSION).toHaveTextContent(/^1$/)
  expect(testObj.INPUT).toHaveTextContent(/^1$/)
})

test('prevents multiple decimals', () => {
  fireEvent.click(testObj.DECIMAL)
  fireEvent.click(testObj.DECIMAL)

  expect(testObj.EXPRESSION).toHaveTextContent(/^0\.$/)
  expect(testObj.INPUT).toHaveTextContent(/^0\.$/)
})

test('prepends decimal with zero', () => {
  fireEvent.click(testObj.DECIMAL)

  expect(testObj.EXPRESSION).toHaveTextContent(/^0\.$/)
  expect(testObj.INPUT).toHaveTextContent(/^0\.$/)

  fireEvent.click(testObj.ADD)
  fireEvent.click(testObj.DECIMAL)

  expect(testObj.EXPRESSION).toHaveTextContent(/^0\.\+0\.$/)
  expect(testObj.INPUT).toHaveTextContent(/^0\.$/)

  fireEvent.click(testObj.EQUALS)
  fireEvent.click(testObj.DECIMAL)

  expect(testObj.EXPRESSION).toHaveTextContent(/^0\.$/)
  expect(testObj.INPUT).toHaveTextContent(/^0\.$/)
})

test('uses last operator clicked', () => {
  fireEvent.click(testObj.ONE)
  fireEvent.click(testObj.MULTIPLY)
  fireEvent.click(testObj.ADD)

  expect(testObj.EXPRESSION).toHaveTextContent(/^1\+$/)
  expect(testObj.INPUT).toHaveTextContent(/^\+$/)
})

test('uses negative on operator followed by minus', () => {
  fireEvent.click(testObj.ONE)
  fireEvent.click(testObj.MULTIPLY)
  fireEvent.click(testObj.SUBTRACT)

  expect(testObj.EXPRESSION).toHaveTextContent(/^1\*-$/)
  expect(testObj.INPUT).toHaveTextContent(/^-$/)
})

test('uses subtraction on negative followed by minus', () => {
  fireEvent.click(testObj.ONE)
  fireEvent.click(testObj.MULTIPLY)
  fireEvent.click(testObj.SUBTRACT)
  fireEvent.click(testObj.SUBTRACT)

  expect(testObj.EXPRESSION).toHaveTextContent(/^1-$/)
  expect(testObj.INPUT).toHaveTextContent(/^-$/)
})
