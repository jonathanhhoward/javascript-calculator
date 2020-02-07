import handleDigit from './handle-digit'

export default function handleDecimal (state, decimal) {
  const { input, isEquals, isNegative, isOperator } = state

  if (input.includes(decimal) && !isEquals) return

  return (input === '0' || isEquals || isNegative || isOperator)
    ? handleDigit(state, '0' + decimal)
    : handleDigit(state, decimal)
}
