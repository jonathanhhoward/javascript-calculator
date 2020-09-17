function handleOperator(state, operator) {
  const isResult = state.status === 'RESULT';
  const isNegative = state.status === 'NEGATIVE';
  const isOperator = state.status === 'OPERATOR';

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
  status: 'OPERATOR',
});

const replaceNegative = (state, operator) => ({
  expression: state.expression.slice(0, -2) + operator,
  input: operator,
  status: 'OPERATOR',
});

const appendNegative = (state, operator) => ({
  expression: state.expression + operator,
  input: operator,
  status: 'NEGATIVE',
});

const replaceOperator = (state, operator) => ({
  expression: state.expression.slice(0, -1) + operator,
  input: operator,
});

const append = (state, operator) => ({
  expression: state.expression + operator,
  input: operator,
  status: 'OPERATOR',
});

export default handleOperator;
