export const numberToString = (number, sigDigits = 10) => {
  const precise = number.toPrecision(sigDigits)
  const result = Number(precise).toString()
  const reNotSigDigit = /(^-?0)|[-.]/g
  const EMPTY_STR = ''

  if (result.replace(reNotSigDigit, EMPTY_STR).length > sigDigits) {
    return Number(result).toExponential()
  } else {
    return result
  }
}
