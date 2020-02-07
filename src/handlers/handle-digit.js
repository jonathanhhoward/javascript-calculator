export default function handleDigit (state, digit) {
  const { input, isResult, isNegative, isOperator } = state

  if (isMaxDigits(input,10) && !isResult) return state

  if (isResult) return replaceResult(state, digit)

  if (isNegative) return appendToNegative(state, digit)

  if (isOperator) return appendToOperator(state, digit)

  if (input === '0') return replaceZero(state, digit)

  return append(state, digit)

  function isMaxDigits (input, limit) {
    return (input.replace(/[.-]/g, '').length === limit)
  }
}

const replaceResult = (state, digit) => ({
  expression: digit,
  input: digit,
  isResult: !state.isResult
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
