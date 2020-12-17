/**
 * @param {{expression: string, input: string, status: string}} state
 * @param {string} equals
 * @returns {{expression: string, input: string, status: string}}
 */
export default function (state, equals) {
  switch (state.status) {
    case 'RESULT':
      return state;
    case 'NEGATIVE':
      return {
        ...state,
        expression: state.expression.slice(0, -2) + equals,
        status: 'EQUALS',
      };
    case 'OPERATOR':
      return {
        ...state,
        expression: state.expression.slice(0, -1) + equals,
        status: 'EQUALS',
      };
    default:
      return {
        ...state,
        expression: state.expression + equals,
        status: 'EQUALS',
      };
  }
}
