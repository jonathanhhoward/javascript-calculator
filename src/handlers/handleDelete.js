import { STATUS } from "utils";

/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} _symbol
 * @returns void
 */
export function handleDelete(state, dispatch, _symbol) {
  switch (state.status) {
    case STATUS.INPUT:
      return dispatch({ type: "delete", payload: "0" });
    default:
  }
}
