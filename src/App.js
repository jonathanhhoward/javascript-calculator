import React from 'react'
import Display from './components/Display'
import KeyPad from './components/KeyPad'
import calculate from './modules/calculate'
import setPrecision10 from './modules/setPrecision10'
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

    this.setState(state => ({
      expression: state.expression.slice(0, -state.input.length) + '0',
      input: '0'
    }))
  }

  handleEquals = (equals) => {
    const { isEquals, isNegative, isOperator } = this.state

    if (isEquals) return

    if (isNegative) {
      this.setState(state => ({
        expression: state.expression.slice(0, -2) + equals,
        isNegative: !state.isNegative
      }))
    } else if (isOperator) {
      this.setState(state => ({
        expression: state.expression.slice(0, -1) + equals,
        isOperator: !state.isOperator
      }))
    } else {
      this.setState(state => ({
        expression: state.expression + equals
      }))
    }

    this.setState(state => {
      let result

      try {
        result = setPrecision10(calculate(state.expression))
      } catch (error) {
        result = error.message
      }

      return {
        input: result,
        isEquals: !state.isEquals
      }
    })
  }

  handleOperator = (operator) => {
    const { isEquals, isNegative, isOperator } = this.state

    if (isEquals) {
      this.setState(state => ({
        expression: state.input + operator,
        input: operator,
        isEquals: !state.isEquals,
        isOperator: !state.isOperator
      }))
    } else if (isNegative) {
      this.setState(state => ({
        expression: state.expression.slice(0, -2) + operator,
        input: operator,
        isNegative: !state.isNegative,
        isOperator: !state.isOperator
      }))
    } else if (isOperator) {
      if (operator === '-') {
        this.setState(state => ({
          expression: state.expression + operator,
          input: operator,
          isNegative: !state.isNegative,
          isOperator: !state.isOperator
        }))
      } else {
        this.setState(state => ({
          expression: state.expression.slice(0, -1) + operator,
          input: operator
        }))
      }
    } else {
      this.setState(state => ({
        expression: state.expression + operator,
        input: operator,
        isOperator: !state.isOperator
      }))
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

    const MAX_DIGITS = 10
    const isMaxDigits = (input.replace(/[.-]/g, '').length === MAX_DIGITS)

    if (isMaxDigits && !isEquals) return

    if (isEquals) {
      this.setState(state => ({
        expression: digit,
        input: digit,
        isEquals: !state.isEquals
      }))
    } else if (isNegative) {
      this.setState(state => ({
        expression: state.expression + digit,
        input: state.input + digit,
        isNegative: !state.isNegative
      }))
    } else if (isOperator) {
      this.setState(state => ({
        expression: state.expression + digit,
        input: digit,
        isOperator: !state.isOperator
      }))
    } else if (input === '0') {
      this.setState(state => ({
        expression: state.expression.slice(0, -1) + digit,
        input: digit
      }))
    } else {
      this.setState(state => ({
        expression: state.expression + digit,
        input: state.input + digit
      }))
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
