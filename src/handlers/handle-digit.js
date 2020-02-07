export default function handleDigit (state, digit) {
  const { input, isEquals, isNegative, isOperator } = state

  if (isMaxDigits(input,10) && !isEquals) return state

  if (isEquals) {
    return replaceResult(state, digit)
  } else if (isNegative) {
    return appendToNegative(state, digit)
  } else if (isOperator) {
    return appendToOperator(state, digit)
  } else if (input === '0') {
    return replaceZero(state, digit)
  } else {
    return append(state, digit)
  }

  function isMaxDigits (input, limit) {
    return input.replace(/[.-]/g, '').length === limit
  }
}

const replaceResult = (state, digit) => ({
  expression: digit,
  input: digit,
  isEquals: !state.isEquals
})

const appendToNegative = (state, digit) => ({
  expression: state.expression + digit,
  input: state.input + digit,
  isNegative: !state.isNegative
})

const appendToOperator = (state, digit) => ({
  expression: state.expression + digit,
  input: digit,
  isOperator: !state.isOperator
})

const replaceZero = (state, digit) => ({
  expression: state.expression.slice(0, -1) + digit,
  input: digit
})

const append = (state, digit) => ({
  expression: state.expression + digit,
  input: state.input + digit
})
