import handleDigit from './handleDigit';

/**
 * @param {{expression: string, input: string, status: string}} state
 * @param {string} decimal
 * @returns {{expression: string, input: string, status: string}}
 */
export default function (state, decimal) {
  const isResult = state.status === 'RESULT';

  if (state.input.includes(decimal) && !isResult) return state;

  return state.input === '0' || state.status
    ? handleDigit(state, '0' + decimal)
    : handleDigit(state, decimal);
}
