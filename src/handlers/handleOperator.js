function handleOperator(state, operator) {
  const { isOperator } = state;
  const isResult = state.status === 'RESULT';
  const isNegative = state.status === 'NEGATIVE';

  if (isResult) return appendToResult(state, operator);

  if (isNegative) return replaceNegative(state, operator);

  if (isOperator)
    return operator === '-'
      ? appendNegative(state, operator)
      : replaceOperator(state, operator);

  return append(state, operator);
}

const appendToResult = (state, operator) => ({
  expression: state.input + operator,
  input: operator,
  isOperator: !state.isOperator,
  status: '',
});

const replaceNegative = (state, operator) => ({
  expression: state.expression.slice(0, -2) + operator,
  input: operator,
  isOperator: !state.isOperator,
  status: '',
});

const appendNegative = (state, operator) => ({
  expression: state.expression + operator,
  input: operator,
  isOperator: !state.isOperator,
  status: 'NEGATIVE',
});

const replaceOperator = (state, operator) => ({
  expression: state.expression.slice(0, -1) + operator,
  input: operator,
});

const append = (state, operator) => ({
  expression: state.expression + operator,
  input: operator,
  isOperator: !state.isOperator,
});

export default handleOperator;
