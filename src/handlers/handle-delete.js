export default function handleDelete (state) {
  const { isResult, isOperator } = state

  if (isResult || isOperator) return state

  return zeroInput(state)
}

const zeroInput = (state) => ({
  expression: state.expression.slice(0, -state.input.length) + '0',
  input: '0'
})
