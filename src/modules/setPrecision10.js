export default function setPrecision10(number) {
  if (Number.isNaN(number)) return NaN.toString();

  if (number === 0) return '0';

  const absNumber = Math.abs(number);

  if (1e-6 <= absNumber && absNumber < 1) {
    const round9 = Math.round(number * 1e9) / 1e9;
    return round9.toString();
  }

  const precision10 = Number(number).toPrecision(10);

  return absNumber < 1e-6 || 1e10 <= absNumber
    ? Number(precision10).toExponential()
    : Number(precision10).toString();
}
