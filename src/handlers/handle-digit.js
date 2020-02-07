import * as Digit from '../callbacks/digit'

export default function handleDigit (state, digit) {
  const { input, isEquals, isNegative, isOperator } = state

  if (isMaxDigits(input,10) && !isEquals) return

  if (isEquals) {
    return Digit.replaceResult(state, digit)
  } else if (isNegative) {
    return Digit.appendToNegative(state, digit)
  } else if (isOperator) {
    return Digit.appendToOperator(state, digit)
  } else if (input === '0') {
    return Digit.replaceZero(state, digit)
  } else {
    return Digit.append(state, digit)
  }

  function isMaxDigits (input, limit) {
    return input.replace(/[.-]/g, '').length === limit
  }
}
