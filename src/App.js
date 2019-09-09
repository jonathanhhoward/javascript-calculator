import React from 'react'
import calculate from './calculate'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      expression: '0',
      input: '0',
      equalsClicked: false,
      operatorClicked: false,
      isNegative: false,
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
      equalsClicked: false,
      operatorClicked: false,
      isNegative: false,
    })
  }

  handleDelete = () => {
    const expression = this.state.expression
    const input = this.state.input

    if (
      (input === '0') || input.match(/[+\-*/]/) || expression.includes('=')
    ) return

    this.setState(state => ({
      expression: state.expression.slice(0, -state.input.length) + '0',
      input: '0',
    }))
  }

  handleEquals = () => {
    const equalsClicked = this.state.equalsClicked
    const operatorClicked = this.state.operatorClicked
    const isNegative = this.state.isNegative

    if (equalsClicked) return

    if (operatorClicked) {
      if (isNegative) {
        this.setState(state => ({
          expression: state.expression.slice(0, -2) + '=',
          operatorClicked: false,
          isNegative: false,
        }))
      } else {
        this.setState(state => ({
          expression: state.expression.slice(0, -1) + '=',
          operatorClicked: false,
        }))
      }
    } else {
      this.setState(state => ({
        expression: state.expression + '=',
      }))
    }

    this.setState(state => {
      const SIG_DIGITS = 10

      let result
      try {
        result = setPrecision(calculate(state.expression), SIG_DIGITS)
      } catch (error) {
        result = error.message
      }

      return {
        input: result,
        equalsClicked: true,
      }
    })
  }

  handleOperator = (value) => {
    const equalsClicked = this.state.equalsClicked
    const operatorClicked = this.state.operatorClicked
    const isNegative = this.state.isNegative

    if (equalsClicked) {
      this.setState(state => ({
        expression: state.input + value,
        input: value,
        equalsClicked: false,
        operatorClicked: true,
      }))
    } else if (operatorClicked) {
      if (isNegative) {
        this.setState(state => ({
          expression: state.expression.slice(0, -2) + value,
          input: value,
          isNegative: false,
        }))
      } else if (value === '-') {
        this.setState(state => ({
          expression: state.expression + '-',
          input: '-',
          isNegative: true,
        }))
      } else {
        this.setState(state => ({
          expression: state.expression.slice(0, -1) + value,
          input: value,
        }))
      }
    } else {
      this.setState(state => ({
        expression: state.expression + value,
        input: value,
        operatorClicked: true,
      }))
    }
  }

  handleDecimal = () => {
    const input = this.state.input
    const equalsClicked = this.state.equalsClicked
    const operatorClicked = this.state.operatorClicked

    if (input.includes('.') && !equalsClicked) return

    if ((input === '0') || operatorClicked || equalsClicked) {
      this.handleDigit('0.')
    } else {
      this.handleDigit('.')
    }
  }

  handleDigit = (value) => {
    const input = this.state.input
    const equalsClicked = this.state.equalsClicked
    const operatorClicked = this.state.operatorClicked

    const isExtraZero = ((value === '0') && (input === '0'))
    const isMaxDigits = (
      ((input.length === 10) && !input.includes('.')) ||
      ((input.length === 11) && input.includes('.'))
    )
    if ((isExtraZero || isMaxDigits) && !equalsClicked) return

    if (equalsClicked) {
      this.setState({
        expression: value,
        input: value,
        equalsClicked: false,
      })
    } else if (operatorClicked) {
      this.setState(state => ({
        expression: state.expression + value,
        input: value,
        operatorClicked: false,
        isNegative: false,
      }))
    } else if (input === '0') {
      this.setState(state => ({
        expression: state.expression.slice(0, -1) + value,
        input: value,
      }))
    } else {
      this.setState(state => ({
        expression: state.expression + value,
        input: state.input + value,
      }))
    }
  }

  render () {
    return (
      <div className="App">
        <Display expression={this.state.expression} input={this.state.input}/>
        <KeyPad onClick={this.handleClick}/>
      </div>
    )
  }
}

function Display (props) {
  return (
    <div className="Display">
      <Expression expression={props.expression}/>
      <Input input={props.input}/>
    </div>
  )
}

function Expression (props) {
  return <div className="Expression">{props.expression}</div>
}

function Input (props) {
  return <div className="Input" id="display">{props.input}</div>
}

function KeyPad (props) {
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
    { id: 'nine', class: 'digit', value: '9' },
  ]

  return (
    <div className="KeyPad">
      {keys.map(obj => (
        <Key key={obj.id} obj={obj} onClick={props.onClick}/>
      ))}
    </div>
  )
}

function Key (props) {
  const obj = props.obj

  return (
    <button
      className={"Key " + obj.class}
      id={obj.id}
      onClick={props.onClick}
      type="button"
      value={obj.value}
    >
      {obj.value}
    </button>
  )
}

function setPrecision (numStr, sigDigits) {
  const precise = Number(numStr).toPrecision(sigDigits)
  const result = Number(precise).toString()
  const regExp = /[-.]/g
  const EMPTY_STR = ''

  if (result.replace(regExp, EMPTY_STR).length > sigDigits) {
    return Number(result).toExponential()
  } else {
    return result
  }
}

export default App
