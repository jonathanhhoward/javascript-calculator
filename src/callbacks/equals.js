import setPrecision10 from '../modules/setPrecision10'
import calculate from '../modules/calculate'

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
