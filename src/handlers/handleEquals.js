/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} symbol
 * @returns void
 */
export default function (state, dispatch, symbol) {
  switch (state.status) {
    case 'RESULT':
      return;
    case 'NEGATIVE':
      return dispatch({ type: 'equals-negative', payload: symbol });
    case 'OPERATOR':
      return dispatch({ type: 'equals-operator', payload: symbol });
    default:
      return dispatch({ type: 'equals-default', payload: symbol });
  }
}
