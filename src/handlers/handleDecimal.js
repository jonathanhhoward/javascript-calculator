import handleDigit from './handleDigit';

/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} symbol
 * @returns void
 */
export default function (state, dispatch, symbol) {
  const isResult = state.status === 'RESULT';

  if (state.input.includes(symbol) && !isResult) return;

  return state.input === '0' || state.status
    ? handleDigit(state, dispatch, '0' + symbol)
    : handleDigit(state, dispatch, symbol);
}
