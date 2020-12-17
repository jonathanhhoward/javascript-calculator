import React, { useState, useEffect } from 'react';
import { Display, KeyPad } from './components';
import { getResult, initialState } from './utils';
import { selectHandler } from './handlers';
import './App.scss';

export function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (state.status !== 'EQUALS') return;
    setState((prevState) => getResult(prevState));
  }, [state.status]);

  function handleClick(event) {
    const value = event.target.value;
    setState((prevState) => selectHandler(prevState, value));
  }

  return (
    <div className="App">
      <Display expression={state.expression} input={state.input} />
      <KeyPad onClick={handleClick} />
    </div>
  );
}
