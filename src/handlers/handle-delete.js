export default function handleDelete (state) {
  const { isResult, isOperator } = state

  if (isResult || isOperator) return state

  return { input: '0' }
}
