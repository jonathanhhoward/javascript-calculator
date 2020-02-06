import setPrecision10 from '../modules/setPrecision10'
import calculate from '../modules/calculate'

export const replaceNegative = (state, equals) => ({
  expression: state.expression.slice(0, -2) + equals,
  isNegative: !state.isNegative
})

export const replaceOperator = (state, equals) => ({
  expression: state.expression.slice(0, -1) + equals,
  isOperator: !state.isOperator
})

export const append = (state, equals) => ({
  expression: state.expression + equals
})

export const result = state => {
  let result

  try {
    result = setPrecision10(calculate(state.expression))
  } catch (error) {
    result = error.message
  }

  return {
    input: result,
    isEquals: !state.isEquals
  }
}
