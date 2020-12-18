/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} symbol
 * @returns void
 */
export default function (state, dispatch, symbol) {
  const isMaxDigits = state.input.replace(/[.-]/g, '').length === 10;
  const isResult = state.status === 'RESULT';

  if (isMaxDigits && !isResult) return;

  switch (state.status) {
    case 'RESULT':
      return dispatch({ type: 'digit-result', payload: symbol });
    case 'NEGATIVE':
      return dispatch({ type: 'digit-negative', payload: symbol });
    case 'OPERATOR':
      return dispatch({ type: 'digit-operator', payload: symbol });
    default:
      return state.input === '0'
        ? dispatch({ type: 'digit-default-zero', payload: symbol })
        : dispatch({ type: 'digit-default', payload: symbol });
  }
}
