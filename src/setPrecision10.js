export const setPrecision10 = (number) => {
  if (Number.isNaN(number)) return NaN

  if (number === 0) return '0'

  const absNumber = Math.abs(number)

  if (1e-6 <= absNumber && absNumber < 1) {
    const round9 = Math.round(number * 1e+9) / 1e+9
    return round9.toString()
  }

  const precision10 = Number(number).toPrecision(10)

  if (absNumber < 1e-6 || 1e+10 <= absNumber) {
    return Number(precision10).toExponential()
  } else {
    return Number(precision10).toString()
  }
}
