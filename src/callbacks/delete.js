export const zeroInput = state => ({
  expression: state.expression.slice(0, -state.input.length) + '0',
  input: '0'
})
