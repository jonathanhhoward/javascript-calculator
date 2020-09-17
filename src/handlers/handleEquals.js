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
  isEquals: !state.isEquals,
});

const replaceOperator = (state, equals) => ({
  expression: state.expression.slice(0, -1) + equals,
  isOperator: !state.isOperator,
  isEquals: !state.isEquals,
});

const append = (state, equals) => ({
  expression: state.expression + equals,
  isEquals: !state.isEquals,
});

export default handleEquals;
