import * as Delete from '../callbacks/delete'

export default function handleDelete (state) {
  const { isEquals, isNegative, isOperator } = state

  if (isEquals || isNegative || isOperator) return state

  return Delete.zeroInput(state)
}
