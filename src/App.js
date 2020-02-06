import React from 'react'
import Display from './components/Display'
import KeyPad from './components/KeyPad'
import * as Delete from './callbacks/delete'
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
        this.handleClear()
        break
      case 'C':
        this.handleDelete()
        break
      case '=':
        this.handleEquals(value)
        break
      case '+':
      case '-':
      case '*':
      case '/':
        this.handleOperator(value)
        break
      case '.':
        this.handleDecimal(value)
        break
      default:
        this.handleDigit(value)
    }
  }

  handleClear = () => {
    this.setState(this.initialState)
  }

  handleDelete = () => {
    const { isEquals, isNegative, isOperator } = this.state

    if (isEquals || isNegative || isOperator) return

    this.setState(state => Delete.zeroInput(state))
  }

  handleEquals = (equals) => {
    const { isEquals, isNegative, isOperator } = this.state

    if (isEquals) return

    if (isNegative) {
      this.setState(state => Equals.replaceNegative(state, equals))
    } else if (isOperator) {
      this.setState(state => Equals.replaceOperator(state, equals))
    } else {
      this.setState(state => Equals.append(state, equals))
    }

    this.setState(state => Equals.result(state))
  }

  handleOperator = (operator) => {
    const { isEquals, isNegative, isOperator } = this.state

    if (isEquals) {
      this.setState(state => Operator.appendToResult(state, operator))
    } else if (isNegative) {
      this.setState(state => Operator.replaceNegative(state, operator))
    } else if (isOperator) {
      if (operator === '-') {
        this.setState(state => Operator.appendNegative(state, operator))
      } else {
        this.setState(state => Operator.replaceOperator(state, operator))
      }
    } else {
      this.setState(state => Operator.append(state, operator))
    }
  }

  handleDecimal = (decimal) => {
    const { input, isEquals, isNegative, isOperator } = this.state

    if (input.includes(decimal) && !isEquals) return

    if (input === '0' || isEquals || isNegative || isOperator) {
      this.handleDigit('0' + decimal)
    } else {
      this.handleDigit(decimal)
    }
  }

  handleDigit = (digit) => {
    const { input, isEquals, isNegative, isOperator } = this.state

    if (isMaxDigits(10) && !isEquals) return

    if (isEquals) {
      this.setState(state => Digit.replaceResult(state, digit))
    } else if (isNegative) {
      this.setState(state => Digit.appendToNegative(state, digit))
    } else if (isOperator) {
      this.setState(state => Digit.appendToOperator(state, digit))
    } else if (input === '0') {
      this.setState(state => Digit.replaceZero(state, digit))
    } else {
      this.setState(state => Digit.append(state, digit))
    }

    function isMaxDigits(limit) {
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
