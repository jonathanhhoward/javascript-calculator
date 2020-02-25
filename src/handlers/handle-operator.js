export default function handleOperator (state, operator) {
  const { isResult, isOperator } = state

  if (isResult) return appendToResult(state, operator)

  if (isOperator) return replaceOperator(state, operator)

  return append(state, operator)
}

const appendToResult = (state, operator) => ({
  expression: state.input + operator,
  input: operator,
  isResult: !state.isResult,
  isOperator: !state.isOperator
})

const replaceOperator = (state, operator) => ({
  expression: state.expression.slice(0, -1) + operator,
  input: operator
})

const append = (state, operator) => ({
  expression: state.expression + operator,
  input: operator,
  isOperator: !state.isOperator
})
