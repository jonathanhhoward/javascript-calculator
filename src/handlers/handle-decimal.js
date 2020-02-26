import handleDigit from './handle-digit'

export default function handleDecimal (state, decimal) {
  const { input, isResult, isOperator } = state

  if (includesDecimal()) return state

  return beginsWithZero()
    ? handleDigit(state, '0' + decimal)
    : handleDigit(state, decimal)

  function beginsWithZero () {
    return input === '0' || isOperator || isResult
  }

  function includesDecimal() {
    return input.includes(decimal) && !isOperator && !isResult
  }
}
