import { STATUS } from "utils";

/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} symbol
 * @returns void
 */
export function handleEquals(state, dispatch, symbol) {
  switch (state.status) {
    case STATUS.NEGATIVE:
      return dispatch({ type: "equals-negative", payload: symbol });
    case STATUS.OPERATOR:
      return dispatch({ type: "equals-operator", payload: symbol });
    case STATUS.INPUT:
      return dispatch({ type: "equals-input", payload: symbol });
    default:
  }
}
