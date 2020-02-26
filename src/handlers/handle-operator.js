export default function handleOperator (state, operator) {
  const { isResult, isOperator } = state

  if (isResult) return appendWithResult(state, operator)

  if (isOperator) return replaceOperator(state, operator)

  return appendWithInput(state, operator)
}

const appendWithResult = (state, operator) => ({
  expression: state.input + operator,
  isResult: !state.isResult,
  isOperator: !state.isOperator
})

const replaceOperator = (state, operator) => ({
  expression: state.expression.slice(0, -1) + operator,
})

const appendWithInput = (state, operator) => ({
  expression: state.expression + state.input + operator,
  isOperator: !state.isOperator
})
