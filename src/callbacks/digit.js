export const replaceResult = (state, digit) => ({
  expression: digit,
  input: digit,
  isEquals: !state.isEquals
})

export const appendToNegative = (state, digit) => ({
  expression: state.expression + digit,
  input: state.input + digit,
  isNegative: !state.isNegative
})

export const appendToOperator = (state, digit) => ({
  expression: state.expression + digit,
  input: digit,
  isOperator: !state.isOperator
})

export const replaceZero = (state, digit) => ({
  expression: state.expression.slice(0, -1) + digit,
  input: digit
})

export const append = (state, digit) => ({
  expression: state.expression + digit,
  input: state.input + digit
})
