import {STATUS} from '../utils';

/**
 * @param {{ expression: string, input: string, status: string }} state
 * @param {function({ type: string, payload: string }): void} dispatch
 * @param {string} symbol
 * @returns void
 */
export default function (state, dispatch, symbol) {
  const isMaxDigits = state.input.replace(/[.-]/g, '').length === 10;
  const isResult = state.status === STATUS.RESULT;

  if (isMaxDigits && !isResult) return;

  switch (state.status) {
    case STATUS.RESULT:
      return dispatch({ type: 'digit-result', payload: symbol });
    case STATUS.NEGATIVE:
      return dispatch({ type: 'digit-negative', payload: symbol });
    case STATUS.OPERATOR:
      return dispatch({ type: 'digit-operator', payload: symbol });
    case STATUS.INPUT:
      return state.input === '0'
        ? dispatch({ type: 'digit-input-zero', payload: symbol })
        : dispatch({ type: 'digit-input', payload: symbol });
  }
}
