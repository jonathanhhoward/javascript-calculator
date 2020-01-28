import React from 'react'
import calculate from './calculate'
import setPrecision10 from './setPrecision10'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expression: '0',
      input: '0',
      isEquals: false,
      isNegative: false,
      isOperator: false
    }
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
    this.setState({
      expression: '0',
      input: '0',
      isEquals: false,
      isNegative: false,
      isOperator: false
    })
  }

  handleDelete = () => {
    const { expression, input } = this.state

    if (
      input === '0' || /[-+*/]/.test(input) || expression.includes('=')
    ) return

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
      let result = null

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

    const isExtraZero = (value === '0' && input === '0')
    const isMaxDigits = (input.replace('.', '').length === MAX_DIGITS)

    if ((isExtraZero || isMaxDigits) && !isEquals) return

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

function Display (props) {
  const { expression, input } = props

  return (
    <div className="Display">
      <div className="Expression">{expression}</div>
      <div className="Input" id="display">{input}</div>
    </div>
  )
}

function KeyPad (props) {
  const onClick = props.onClick
  const keys = [
    { id: 'clear', class: 'clear', value: 'AC' },
    { id: 'delete', class: 'delete', value: 'C' },
    { id: 'divide', class: 'operator', value: '/' },
    { id: 'multiply', class: 'operator', value: '*' },
    { id: 'subtract', class: 'operator', value: '-' },
    { id: 'add', class: 'operator', value: '+' },
    { id: 'equals', class: 'equals', value: '=' },
    { id: 'decimal', class: 'digit', value: '.' },
    { id: 'zero', class: 'digit', value: '0' },
    { id: 'one', class: 'digit', value: '1' },
    { id: 'two', class: 'digit', value: '2' },
    { id: 'three', class: 'digit', value: '3' },
    { id: 'four', class: 'digit', value: '4' },
    { id: 'five', class: 'digit', value: '5' },
    { id: 'six', class: 'digit', value: '6' },
    { id: 'seven', class: 'digit', value: '7' },
    { id: 'eight', class: 'digit', value: '8' },
    { id: 'nine', class: 'digit', value: '9' }
  ]

  return (
    <div className="KeyPad">
      {keys.map(obj => (
        <Key key={obj.id} obj={obj} onClick={onClick}/>
      ))}
    </div>
  )
}

function Key (props) {
  const { obj, onClick } = props

  return (
    <button
      className={'Key ' + obj.class}
      id={obj.id}
      onClick={onClick}
      type="button"
      value={obj.value}
    >
      {obj.value}
    </button>
  )
}

export default App
