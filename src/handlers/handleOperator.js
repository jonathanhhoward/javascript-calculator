import { STATUS } from '../utils';

/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} symbol
 * @returns void
 */
export default function (state, dispatch, symbol) {
  switch (state.status) {
    case STATUS.RESULT:
      return dispatch({ type: 'operator-result', payload: symbol });
    case STATUS.NEGATIVE:
      return dispatch({ type: 'operator-negative', payload: symbol });
    case STATUS.OPERATOR:
      return symbol === '-'
        ? dispatch({ type: 'operator-operator-negate', payload: symbol })
        : dispatch({ type: 'operator-operator', payload: symbol });
    case STATUS.INPUT:
      return dispatch({ type: 'operator-input', payload: symbol });
  }
}
