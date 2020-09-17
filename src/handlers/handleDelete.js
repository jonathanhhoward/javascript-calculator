function handleDelete(state) {
  const isResult = state.status === 'RESULT';
  const isNegative = state.status === 'NEGATIVE';
  const isOperator = state.status === 'OPERATOR';

  if (isResult || isNegative || isOperator) return state;

  return zeroInput(state);
}

const zeroInput = (state) => ({
  expression: state.expression.slice(0, -state.input.length) + '0',
  input: '0',
});

export default handleDelete;
