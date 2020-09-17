import React, { useState, useEffect } from 'react';
import Display from './components/Display';
import KeyPad from './components/KeyPad';
import initialState from './modules/initialState';
import getResult from './modules/getResult';
import selectHandler from './handlers/selectHandler';
import './App.scss';

function App() {
  const [state, setState] = useState(initialState());

  useEffect(() => {
    if (state.status !== 'EQUALS') return;
    setState((prevState) => ({
      ...prevState,
      ...getResult(prevState),
    }));
  }, [state.status]);

  function handleClick(event) {
    const value = event.target.value;
    setState((prevState) => ({
      ...prevState,
      ...selectHandler(prevState, value),
    }));
  }

  return (
    <div className="App">
      <Display expression={state.expression} input={state.input} />
      <KeyPad onClick={handleClick} />
    </div>
  );
}

export default App;
