import setPrecision10 from './setPrecision10'

export default function getResult (state) {
  const expressionEqualsRemoved = state.expression.slice(0, -1)

  const result = eval(expressionEqualsRemoved)

  return {
    input: setPrecision10(result),
    isResult: !state.isResult,
    isEquals: !state.isEquals
  }
}
