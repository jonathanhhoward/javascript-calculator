export default function handleEquals (state, equals) {
  const { isResult, isOperator } = state

  if (isResult) return state

  if (isOperator) return replaceOperator(state, equals)

  return appendWithInput(state, equals)
}

const replaceOperator = (state, equals) => ({
  expression: state.expression.slice(0, -1) + equals,
  isOperator: !state.isOperator,
  isEquals: !state.isEquals
})

const appendWithInput = (state, equals) => ({
  expression: state.expression + state.input + equals,
  isEquals: !state.isEquals
})
