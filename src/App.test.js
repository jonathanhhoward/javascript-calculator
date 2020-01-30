import React from 'react'
import ReactDOM from 'react-dom'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App/>, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('rejects leading zeros', () => {
  const { getByTestId, getAllByRole } = render(<App/>)
  const buttons = getAllByRole('button')
  const zero = buttons.find(node => node.textContent === '0')
  const one = buttons.find(node => node.textContent === '1')
  const input = getByTestId('input')

  fireEvent.click(zero)
  fireEvent.click(one)

  expect(input).toHaveTextContent(/^1$/)
})

it('rejects multiple decimals', () => {
  const { getByTestId, getAllByRole } = render(<App/>)
  const buttons = getAllByRole('button')
  const one = buttons.find(node => node.textContent === '1')
  const decimal = buttons.find(node => node.textContent === '.')
  const input = getByTestId('input')

  fireEvent.click(decimal)
  fireEvent.click(decimal)
  fireEvent.click(one)
  fireEvent.click(decimal)

  expect(input).toHaveTextContent(/^0\.1$/)
})

it('uses last operator clicked', () => {
  const { getByTestId, getAllByRole } = render(<App/>)
  const buttons = getAllByRole('button')
  const one = buttons.find(node => node.textContent === '1')
  const times = buttons.find(node => node.textContent === '*')
  const plus = buttons.find(node => node.textContent === '+')
  const equals = buttons.find(node => node.textContent === '=')
  const input = getByTestId('input')

  fireEvent.click(one)
  fireEvent.click(times)
  fireEvent.click(plus)
  fireEvent.click(one)
  fireEvent.click(equals)

  expect(input).toHaveTextContent(/^2$/)
})

it('uses negative on operator followed by minus', () => {
  const { getByTestId, getAllByRole } = render(<App/>)
  const buttons = getAllByRole('button')
  const one = buttons.find(node => node.textContent === '1')
  const times = buttons.find(node => node.textContent === '*')
  const minus = buttons.find(node => node.textContent === '-')
  const equals = buttons.find(node => node.textContent === '=')
  const input = getByTestId('input')

  fireEvent.click(one)
  fireEvent.click(times)
  fireEvent.click(minus)
  fireEvent.click(one)
  fireEvent.click(equals)

  expect(input).toHaveTextContent(/^-1$/)
})

it('uses subtraction on negative followed by minus', () => {
  const { getByTestId, getAllByRole } = render(<App/>)
  const buttons = getAllByRole('button')
  const one = buttons.find(node => node.textContent === '1')
  const times = buttons.find(node => node.textContent === '*')
  const minus = buttons.find(node => node.textContent === '-')
  const equals = buttons.find(node => node.textContent === '=')
  const input = getByTestId('input')

  fireEvent.click(one)
  fireEvent.click(times)
  fireEvent.click(minus)
  fireEvent.click(minus)
  fireEvent.click(one)
  fireEvent.click(equals)

  expect(input).toHaveTextContent(/^0$/)
})
