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
      input === '0' || /[-+*/]/.test(input) || expression.includes('=')
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

    this.setState(state => ({
      input: (() => {
        try {
          return calculate(state.expression)
        } catch (error) {
          return error.message
        }
      })(),
      equalsClicked: true,
    }))
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

    if (input === '0' || operatorClicked || equalsClicked) {
      this.handleDigit('0.')
    } else {
      this.handleDigit('.')
    }
  }

  handleDigit = (value) => {
    const input = this.state.input
    const equalsClicked = this.state.equalsClicked
    const operatorClicked = this.state.operatorClicked

    const isExtraZero = (value === '0' && input === '0')
    const MAX_DIGITS = 10
    const isMaxDigits = (input.replace('.', '').length === MAX_DIGITS)
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
    const expression = this.state.expression
    const input = this.state.input

    return (
      <div className="App">
        <Display expression={expression} input={input}/>
        <KeyPad onClick={this.handleClick}/>
      </div>
    )
  }
}

function Display (props) {
  const expression = props.expression
  const input = props.input

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
    { id: 'nine', class: 'digit', value: '9' },
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
  const obj = props.obj
  const onClick = props.onClick

  return (
    <button
      className={'Key ' + obj.class} id={obj.id} onClick={onClick} type="button"
      value={obj.value}
    >
      {obj.value}
    </button>
  )
}

export default App
