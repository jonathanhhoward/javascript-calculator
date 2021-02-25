import { STATUS } from "../utils";
import { handleDigit } from "./handleDigit";

/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} symbol
 * @returns void
 */
export function handleDecimal(state, dispatch, symbol) {
  if (state.input.includes(symbol) && state.status !== STATUS.RESULT) return;

  return state.input === "0" || state.status !== STATUS.INPUT
    ? handleDigit(state, dispatch, "0" + symbol)
    : handleDigit(state, dispatch, symbol);
}
