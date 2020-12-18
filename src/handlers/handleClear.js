/**
 * @param {{ expression: string, input: string, status: string }} _state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} symbol
 * @returns void
 */
export default function (_state, dispatch, symbol) {
  dispatch({ type: 'clear', payload: symbol });
}
