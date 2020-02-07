import * as Operator from '../callbacks/operator'

export default function handleOperator (state, operator) {
  const { isEquals, isNegative, isOperator } = state

  if (isEquals) {
    return Operator.appendToResult(state, operator)
  } else if (isNegative) {
    return Operator.replaceNegative(state, operator)
  } else if (isOperator) {
    return (operator === '-')
      ? Operator.appendNegative(state, operator)
      : Operator.replaceOperator(state, operator)
  } else {
    return Operator.append(state, operator)
  }
}
