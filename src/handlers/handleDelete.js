/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} _symbol
 * @returns void
 */
export default function (state, dispatch, _symbol) {
  switch (state.status) {
    case 'RESULT':
    case 'NEGATIVE':
    case 'OPERATOR':
      return;
    case 'INPUT':
      return dispatch({ type: 'delete', payload: '0' });
  }
}
