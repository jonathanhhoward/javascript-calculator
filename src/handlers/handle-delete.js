export default function handleDelete (state) {
  const { isEquals, isNegative, isOperator } = state

  if (isEquals || isNegative || isOperator) return state

  return zeroInput(state)
}

const zeroInput = (state) => ({
  expression: state.expression.slice(0, -state.input.length) + '0',
  input: '0'
})
