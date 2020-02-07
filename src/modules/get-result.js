import setPrecision10 from './setPrecision10'
import calculate from './calculate'

export default function getResult (state) {
  let result

  try {
    result = setPrecision10(calculate(state.expression))
  } catch (error) {
    result = error.message
  }

  return {
    input: result,
    isResult: !state.isResult,
    isEquals: !state.isEquals
  }
}
