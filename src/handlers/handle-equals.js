import * as Equals from '../callbacks/equals'

export default function handleEquals (state, equals) {
  const { isNegative, isOperator } = state

  if (isNegative) {
    return Equals.replaceNegative(state, equals)
  } else if (isOperator) {
    return Equals.replaceOperator(state, equals)
  } else {
    return Equals.append(state, equals)
  }
}
