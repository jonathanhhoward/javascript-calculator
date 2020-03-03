import setPrecision10 from './setPrecision10'

export default function getResult (state) {
  const expression = state.expression.slice(0, -1)

  const result = setPrecision10(eval(expression))

  return replaceInputWithResult(state, result)
}

const replaceInputWithResult = (state, result) => ({
  input: result,
  isResult: !state.isResult,
  isEquals: !state.isEquals
})
