function handleDelete(state) {
  return state.status ? state : zeroInput(state);
}

const zeroInput = (state) => ({
  expression: state.expression.slice(0, -state.input.length) + '0',
  input: '0',
});

export default handleDelete;
