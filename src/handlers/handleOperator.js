/**
 * @param {{expression: string, input: string, status: string}} state
 * @param {string} operator
 * @returns {{expression: string, input: string, status: string}}
 */
export default function (state, operator) {
  switch (state.status) {
    case 'RESULT':
      return {
        expression: state.input + operator,
        input: operator,
        status: 'OPERATOR',
      };
    case 'NEGATIVE':
      return {
        expression: state.expression.slice(0, -2) + operator,
        input: operator,
        status: 'OPERATOR',
      };
    case 'OPERATOR':
      return operator === '-'
        ? {
            expression: state.expression + operator,
            input: operator,
            status: 'NEGATIVE',
          }
        : {
            ...state,
            expression: state.expression.slice(0, -1) + operator,
            input: operator,
          };
    default:
      return {
        expression: state.expression + operator,
        input: operator,
        status: 'OPERATOR',
      };
  }
}
