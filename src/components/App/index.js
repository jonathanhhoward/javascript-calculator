import { useReducer, useEffect } from "react";
import { Display, KeyPad } from "components";
import { reducer } from "reducers";
import { initialState, STATUS } from "utils";
import "./style.scss";

export function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.status !== STATUS.EQUALS) return;
    dispatch({ type: "get-result" });
  }, [state.status]);

  return (
    <div className="App">
      <Display expression={state.expression} input={state.input} />
      <KeyPad state={state} dispatch={dispatch} />
    </div>
  );
}
