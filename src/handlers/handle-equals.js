export default function handleEquals (state, equals) {
  const { isResult, isOperator } = state

  if (isResult) return state

  if (isOperator) return replaceOperator(state, equals)

  return append(state, equals)
}

export const replaceOperator = (state, equals) => ({
  expression: state.expression.slice(0, -1) + equals,
  isOperator: !state.isOperator,
  isEquals: !state.isEquals
})

export const append = (state, equals) => ({
  expression: state.expression + equals,
  isEquals: !state.isEquals
})
