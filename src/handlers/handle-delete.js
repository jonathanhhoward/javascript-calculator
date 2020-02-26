export default function handleDelete (state) {
  const { isResult, isOperator } = state

  if (isResult || isOperator) return state

  return zeroInput()
}

const zeroInput = () => ({
  input: '0'
})
