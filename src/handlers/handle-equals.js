export default function handleEquals (state, equals) {
  const { isResult, isNegative, isOperator } = state

  if (isResult) return state

  if (isNegative) {
    return replaceNegative(state, equals)
  } else if (isOperator) {
    return replaceOperator(state, equals)
  } else {
    return append(state, equals)
  }
}

export const replaceNegative = (state, equals) => ({
  expression: state.expression.slice(0, -2) + equals,
  isNegative: !state.isNegative,
  isEquals: !state.isEquals
})

export const replaceOperator = (state, equals) => ({
  expression: state.expression.slice(0, -1) + equals,
  isOperator: !state.isOperator,
  isEquals: !state.isEquals
})

export const append = (state, equals) => ({
  expression: state.expression + equals,
  isEquals: !state.isEquals
})
