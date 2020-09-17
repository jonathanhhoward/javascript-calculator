function handleDigit(state, digit) {
  const { input } = state;
  const isResult = state.status === 'RESULT';

  if (isMaxDigits(input, 10) && !isResult) return state;

  switch (state.status) {
    case 'RESULT':
      return replaceResult(state, digit);
    case 'NEGATIVE':
      return appendToNegative(state, digit);
    case 'OPERATOR':
      return appendToOperator(state, digit);
    default: {
      if (input === '0') return replaceZero(state, digit);
      return append(state, digit);
    }
  }

  function isMaxDigits(input, limit) {
    return input.replace(/[.-]/g, '').length === limit;
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
