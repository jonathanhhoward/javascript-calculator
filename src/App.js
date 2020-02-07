import React from 'react'
import Display from './components/Display'
import KeyPad from './components/KeyPad'
import handleDelete from './handlers/handle-delete'
import * as Equals from './callbacks/equals'
import * as Operator from './callbacks/operator'
import * as Digit from './callbacks/digit'
import './App.css'

export default class App extends React.Component {
  initialState = {
    expression: '0',
    input: '0',
    isEquals: false,
    isNegative: false,
    isOperator: false
  }

  constructor (props) {
    super(props)
    this.state = this.initialState
  }

  handleClick = (event) => {
    const value = event.target.value

    this.selectHandler(value)
  }

  selectHandler = (value) => {
    switch (value) {
      case 'AC':
        this.setState(this.initialState)
        break
      case 'C':
        this.setState(state => handleDelete(state))
        break
      case '=':
        if (this.state.isEquals) break
        this.setState(state => this.handleEquals(state, value))
        this.setState(state => Equals.result(state))
        break
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState(state => this.handleOperator(state, value))
        break
      case '.':
        this.setState(state => this.handleDecimal(state, value))
        break
      default:
        this.setState(state => this.handleDigit(state, value))
    }
  }

  handleEquals = (state, equals) => {
    const { isNegative, isOperator } = state

    if (isNegative) {
      return Equals.replaceNegative(state, equals)
    } else if (isOperator) {
      return Equals.replaceOperator(state, equals)
    } else {
      return Equals.append(state, equals)
    }
  }

  handleOperator = (state, operator) => {
    const { isEquals, isNegative, isOperator } = state

    if (isEquals) {
      return Operator.appendToResult(state, operator)
    } else if (isNegative) {
      return Operator.replaceNegative(state, operator)
    } else if (isOperator) {
      return (operator === '-')
        ? Operator.appendNegative(state, operator)
        : Operator.replaceOperator(state, operator)
    } else {
      return Operator.append(state, operator)
    }
  }

  handleDecimal = (state, decimal) => {
    const { input, isEquals, isNegative, isOperator } = state

    if (input.includes(decimal) && !isEquals) return

    return (input === '0' || isEquals || isNegative || isOperator)
      ? this.handleDigit(state, '0' + decimal)
      : this.handleDigit(state, decimal)
  }

  handleDigit = (state, digit) => {
    const { input, isEquals, isNegative, isOperator } = state

    if (isMaxDigits(input,10) && !isEquals) return

    if (isEquals) {
      return Digit.replaceResult(state, digit)
    } else if (isNegative) {
      return Digit.appendToNegative(state, digit)
    } else if (isOperator) {
      return Digit.appendToOperator(state, digit)
    } else if (input === '0') {
      return Digit.replaceZero(state, digit)
    } else {
      return Digit.append(state, digit)
    }

    function isMaxDigits (input, limit) {
      return input.replace(/[.-]/g, '').length === limit
    }
  }

  render () {
    const { expression, input } = this.state

    return (
      <div className="App">
        <Display expression={expression} input={input}/>
        <KeyPad onClick={this.handleClick}/>
      </div>
    )
  }
}
