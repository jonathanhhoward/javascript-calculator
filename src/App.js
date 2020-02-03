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
        this.handleEquals()
        break
      case '+':
      case '-':
      case '*':
      case '/':
        this.handleOperator(value)
        break
      case '.':
        this.handleDecimal()
        break
      default:
        this.handleDigit(value)
    }
  }

  handleClear = () => {
    this.setState(this.initialState)
  }

  handleDelete = () => {
    const { input, isEquals, isOperator } = this.state

    if (input === '0' || isOperator || isEquals) return

    this.setState(state => ({
      expression: state.expression.slice(0, -state.input.length) + '0',
      input: '0'
    }))
  }

  handleEquals = () => {
    const { isEquals, isNegative, isOperator } = this.state

    if (isEquals) return

    if (isOperator) {
      if (isNegative) {
        this.setState(state => ({
          expression: state.expression.slice(0, -2) + '=',
          isOperator: false,
          isNegative: false
        }))
      } else {
        this.setState(state => ({
          expression: state.expression.slice(0, -1) + '=',
          isOperator: false
        }))
      }
    } else {
      this.setState(state => ({
        expression: state.expression + '='
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
        isEquals: true
      }
    })
  }

  handleOperator = (value) => {
    const { isEquals, isOperator, isNegative } = this.state

    if (isEquals) {
      this.setState(state => ({
        expression: state.input + value,
        input: value,
        isEquals: false,
        isOperator: true
      }))
    } else if (isOperator) {
      if (isNegative) {
        this.setState(state => ({
          expression: state.expression.slice(0, -2) + value,
          input: value,
          isNegative: false
        }))
      } else if (value === '-') {
        this.setState(state => ({
          expression: state.expression + '-',
          input: '-',
          isNegative: true
        }))
      } else {
        this.setState(state => ({
          expression: state.expression.slice(0, -1) + value,
          input: value
        }))
      }
    } else {
      this.setState(state => ({
        expression: state.expression + value,
        input: value,
        isOperator: true
      }))
    }
  }

  handleDecimal = () => {
    const { input, isEquals, isOperator } = this.state

    if (input.includes('.') && !isEquals) return

    if (input === '0' || isOperator || isEquals) {
      this.handleDigit('0.')
    } else {
      this.handleDigit('.')
    }
  }

  handleDigit = (value) => {
    const { input, isEquals, isOperator } = this.state

    const MAX_DIGITS = 10
    const isMaxDigits = (input.replace('.', '').length === MAX_DIGITS)

    if (isMaxDigits && !isEquals) return

    if (isEquals) {
      this.setState({
        expression: value,
        input: value,
        isEquals: false
      })
    } else if (isOperator) {
      this.setState(state => ({
        expression: state.expression + value,
        input: value,
        isOperator: false,
        isNegative: false
      }))
    } else if (input === '0') {
      this.setState(state => ({
        expression: state.expression.slice(0, -1) + value,
        input: value
      }))
    } else {
      this.setState(state => ({
        expression: state.expression + value,
        input: state.input + value
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
