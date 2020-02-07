import React from 'react'
import Display from './components/Display'
import KeyPad from './components/KeyPad'
import handleDelete from './handlers/handle-delete'
import handleEquals from './handlers/handle-equals'
import * as Equals from './callbacks/equals'
import handleOperator from './handlers/handle-operator'
import handleDecimal from './handlers/handle-decimal'
import handleDigit from './handlers/handle-digit'
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
        this.setState(state => handleEquals(state, value))
        this.setState(state => Equals.result(state))
        break
      case '+':
      case '-':
      case '*':
      case '/':
        this.setState(state => handleOperator(state, value))
        break
      case '.':
        this.setState(state => handleDecimal(state, value))
        break
      default:
        this.setState(state => handleDigit(state, value))
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
