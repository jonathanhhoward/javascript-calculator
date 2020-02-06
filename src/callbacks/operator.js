export const appendToResult = (state, operator) => ({
  expression: state.input + operator,
  input: operator,
  isEquals: !state.isEquals,
  isOperator: !state.isOperator
})

export const replaceNegative = (state, operator) => ({
  expression: state.expression.slice(0, -2) + operator,
  input: operator,
  isNegative: !state.isNegative,
  isOperator: !state.isOperator
})

export const appendNegative = (state, operator) => ({
  expression: state.expression + operator,
  input: operator,
  isNegative: !state.isNegative,
  isOperator: !state.isOperator
})

export const replaceOperator = (state, operator) => ({
  expression: state.expression.slice(0, -1) + operator,
  input: operator
})

export const append = (state, operator) => ({
  expression: state.expression + operator,
  input: operator,
  isOperator: !state.isOperator
})
