export default function handleNegate (state) {
  const { input, isResult, isOperator } = state

  if (isOperator || isResult) return state

  const result = -Number(input)

  return { input: result.toString(10) }
}
