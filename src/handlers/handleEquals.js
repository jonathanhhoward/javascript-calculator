function handleEquals(state, equals) {
  switch (state.status) {
    case 'RESULT':
      return state;
    case 'NEGATIVE':
      return replaceNegative(state, equals);
    case 'OPERATOR':
      return replaceOperator(state, equals);
    default:
      return append(state, equals);
  }
}

const replaceNegative = (state, equals) => ({
  expression: state.expression.slice(0, -2) + equals,
  status: 'EQUALS',
});

const replaceOperator = (state, equals) => ({
  expression: state.expression.slice(0, -1) + equals,
  status: 'EQUALS',
});

const append = (state, equals) => ({
  expression: state.expression + equals,
  status: 'EQUALS',
});

export default handleEquals;
