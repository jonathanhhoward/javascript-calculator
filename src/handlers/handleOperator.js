function handleOperator(state, operator) {
  switch (state.status) {
    case 'RESULT':
      return appendToResult(state, operator);
    case 'NEGATIVE':
      return replaceNegative(state, operator);
    case 'OPERATOR':
      return operator === '-'
        ? appendNegative(state, operator)
        : replaceOperator(state, operator);
    default:
      return append(state, operator);
  }
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
