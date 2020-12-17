/**
 * @param {{expression: string, input: string, status: string}} state
 * @param {string} digit
 * @returns {{expression: string, input: string, status: string}}
 */
export default function (state, digit) {
  const isMaxDigits = state.input.replace(/[.-]/g, '').length === 10;
  const isResult = state.status === 'RESULT';

  if (isMaxDigits && !isResult) return state;

  switch (state.status) {
    case 'RESULT':
      return {
        expression: digit,
        input: digit,
        status: '',
      };
    case 'NEGATIVE':
      return {
        expression: state.expression + digit,
        input: state.input + digit,
        status: '',
      };
    case 'OPERATOR':
      return {
        expression: state.expression + digit,
        input: digit,
        status: '',
      };
    default:
      return state.input === '0'
        ? {
            ...state,
            expression: state.expression.slice(0, -1) + digit,
            input: digit,
          }
        : {
            ...state,
            expression: state.expression + digit,
            input: state.input + digit,
          };
  }
}
