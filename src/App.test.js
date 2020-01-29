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
  const zeroButton = buttons.find(node => node.textContent === '0')
  const oneButton = buttons.find(node => node.textContent === '1')
  const input = getByTestId('input')

  fireEvent.click(zeroButton)
  fireEvent.click(oneButton)

  expect(input).toHaveTextContent(/^1$/)
})

it('rejects multiple decimals', () => {
  const { getByTestId, getAllByRole } = render(<App/>)
  const buttons = getAllByRole('button')
  const oneButton = buttons.find(node => node.textContent === '1')
  const decimalButton = buttons.find(node => node.textContent === '.')
  const input = getByTestId('input')

  fireEvent.click(decimalButton)
  fireEvent.click(decimalButton)
  fireEvent.click(oneButton)
  fireEvent.click(decimalButton)

  expect(input).toHaveTextContent(/^0\.1$/)
})
