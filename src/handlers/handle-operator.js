export default function handleOperator (state, operator) {
  const { isEquals, isNegative, isOperator } = state

  if (isEquals) {
    return appendToResult(state, operator)
  } else if (isNegative) {
    return replaceNegative(state, operator)
  } else if (isOperator) {
    return (operator === '-')
      ? appendNegative(state, operator)
      : replaceOperator(state, operator)
  } else {
    return append(state, operator)
  }
}

const appendToResult = (state, operator) => ({
  expression: state.input + operator,
  input: operator,
  isEquals: !state.isEquals,
  isOperator: !state.isOperator
})

const replaceNegative = (state, operator) => ({
  expression: state.expression.slice(0, -2) + operator,
  input: operator,
  isNegative: !state.isNegative,
  isOperator: !state.isOperator
})

const appendNegative = (state, operator) => ({
  expression: state.expression + operator,
  input: operator,
  isNegative: !state.isNegative,
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
