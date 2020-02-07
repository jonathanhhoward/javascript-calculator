import React from 'react'
import Display from './components/Display'
import KeyPad from './components/KeyPad'
import initialState from './modules/initial-state'
import getResult from './modules/get-result'
import selectHandler from './handlers/select-handler'
import './App.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialState()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    this.state.isEquals && this.setState(getResult)
  }

  handleClick = (event) => {
    const value = event.target.value

    this.setState(state => selectHandler(state, value))
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
