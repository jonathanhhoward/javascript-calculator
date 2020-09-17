function handleDelete(state) {
  const { isOperator } = state;
  const isResult = state.status === 'RESULT';
  const isNegative = state.status === 'NEGATIVE';

  if (isResult || isNegative || isOperator) return state;

  return zeroInput(state);
}

const zeroInput = (state) => ({
  expression: state.expression.slice(0, -state.input.length) + '0',
  input: '0',
});

export default handleDelete;
