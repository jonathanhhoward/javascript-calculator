function handleDigit(state, digit) {
  const { input } = state;
  const isMaxDigits = input.replace(/[.-]/g, '').length === 10;
  const isResult = state.status === 'RESULT';

  if (isMaxDigits && !isResult) return state;

  switch (state.status) {
    case 'RESULT':
      return replaceResult(state, digit);
    case 'NEGATIVE':
      return appendToNegative(state, digit);
    case 'OPERATOR':
      return appendToOperator(state, digit);
    default:
      return input === '0' ? replaceZero(state, digit) : append(state, digit);
  }
}

const replaceResult = (state, digit) => ({
  expression: digit,
  input: digit,
  status: '',
});

const appendToNegative = (state, digit) => ({
  expression: state.expression + digit,
  input: state.input + digit,
  status: '',
});

const appendToOperator = (state, digit) => ({
  expression: state.expression + digit,
  input: digit,
  status: '',
});

const replaceZero = (state, digit) => ({
  expression: state.expression.slice(0, -1) + digit,
  input: digit,
});

const append = (state, digit) => ({
  expression: state.expression + digit,
  input: state.input + digit,
});

export default handleDigit;
