function handleEquals(state, equals) {
  const { isNegative, isOperator } = state;
  const isResult = state.status === 'RESULT';

  if (isResult) return state;

  if (isNegative) return replaceNegative(state, equals);

  if (isOperator) return replaceOperator(state, equals);

  return append(state, equals);
}

const replaceNegative = (state, equals) => ({
  expression: state.expression.slice(0, -2) + equals,
  isNegative: !state.isNegative,
  status: 'EQUALS',
});

const replaceOperator = (state, equals) => ({
  expression: state.expression.slice(0, -1) + equals,
  isOperator: !state.isOperator,
  status: 'EQUALS',
});

const append = (state, equals) => ({
  expression: state.expression + equals,
  status: 'EQUALS',
});

export default handleEquals;
