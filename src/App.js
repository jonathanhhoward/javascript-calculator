import React from 'react'
import Display from './components/Display'
import KeyPad from './components/KeyPad'
import initialState from './modules/initial-state'
import evaluateExpression from './modules/evaluate-expression'
import handleDelete from './handlers/handle-delete'
import handleEquals from './handlers/handle-equals'
import handleOperator from './handlers/handle-operator'
import handleDecimal from './handlers/handle-decimal'
import handleDigit from './handlers/handle-digit'
import './App.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialState()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.state.isEquals) {
      this.setState(state => evaluateExpression(state))
    }
  }

  handleClick = (event) => {
    const value = event.target.value

    this.setState(state => this.selectHandler(state, value))
  }

  selectHandler = (state, value) => {
    switch (value) {
      case 'AC':
        return initialState()
      case 'C':
        return handleDelete(state)
      case '=':
        return handleEquals(state, value)
      case '+':
      case '-':
      case '*':
      case '/':
        return handleOperator(state, value)
      case '.':
        return handleDecimal(state, value)
      default:
        return handleDigit(state, value)
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
