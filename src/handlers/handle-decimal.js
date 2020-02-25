import handleDigit from './handle-digit'

export default function handleDecimal (state, decimal) {
  const { input, isResult, isOperator } = state

  if (input.includes(decimal) && !isResult) return state

  return (input === '0' || isResult || isOperator)
    ? handleDigit(state, '0' + decimal)
    : handleDigit(state, decimal)
}
