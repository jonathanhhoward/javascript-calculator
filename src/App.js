import React, { useState, useEffect } from 'react'
import Display from './components/Display'
import KeyPad from './components/KeyPad'
import initialState from './modules/initial-state'
import getResult from './modules/get-result'
import selectHandler from './handlers/select-handler'
import './App.scss'

function App () {
  const [state, setState] = useState(initialState())

  useEffect(() => {
    if (!state.isEquals) return
    setState(prevState => ({
      ...prevState,
      ...getResult(prevState)
    }))
  }, [state.isEquals])

  function handleClick (event) {
    const value = event.target.value
    setState(prevState => ({
      ...prevState,
      ...selectHandler(prevState, value)
    }))
  }

  return (
    <div className="App">
      <Display expression={state.expression} input={state.input}/>
      <KeyPad onClick={handleClick}/>
    </div>
  )
}

export default App
