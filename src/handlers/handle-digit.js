export default function handleDigit (state, digit) {
  const { input, isResult, isOperator } = state

  if (isMaxDigits(10)) return state

  if (isResult) return resetResultReplaceInput(state, digit)

  if (isOperator) return resetOperatorReplaceInput(state, digit)

  if (input === '0') return replaceInput(state, digit)

  return appendToInput(state, digit)

  function isMaxDigits (limit) {
    return input.replace(/[.-]/g, '').length === limit
      && !isOperator
      && !isResult
  }
}

const resetResultReplaceInput = (state, digit) => ({
  expression: '',
  input: digit,
  isResult: !state.isResult
})

const resetOperatorReplaceInput = (state, digit) => ({
  input: digit,
  isOperator: !state.isOperator
})

const replaceInput = (state, digit) => ({
  input: digit
})

const appendToInput = (state, digit) => ({
  input: state.input + digit
})
