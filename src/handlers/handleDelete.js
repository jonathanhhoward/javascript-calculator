/**
 * @param {{expression: string, input: string, status: string}} state
 * @param {string} _value
 * @returns {{expression: string, input: string, status: string}}
 */
export default function (state, _value = '') {
  return state.status
    ? state
    : {
        ...state,
        expression: state.expression.slice(0, -state.input.length) + '0',
        input: '0',
      };
}
