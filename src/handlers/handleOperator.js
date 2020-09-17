function handleOperator(state, operator) {
  const { isNegative, isOperator } = state;
  const isResult = state.status === 'RESULT';

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
  isNegative: !state.isNegative,
  isOperator: !state.isOperator,
});

const appendNegative = (state, operator) => ({
  expression: state.expression + operator,
  input: operator,
  isNegative: !state.isNegative,
  isOperator: !state.isOperator,
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
