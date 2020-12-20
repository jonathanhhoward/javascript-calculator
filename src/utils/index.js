import { calculate } from './calculate';

export const STATUS = Object.freeze({
  EQUALS: 'EQUALS',
  INPUT: 'INPUT',
  NEGATIVE: 'NEGATIVE',
  OPERATOR: 'OPERATOR',
  RESULT: 'RESULT',
});

export const initialState = {
  expression: '0',
  input: '0',
  status: STATUS.INPUT,
};

export const key = {
  CLEAR: 'AC',
  DELETE: 'C',
  DIVIDE: '/',
  MULTIPLY: '*',
  SUBTRACT: '-',
  ADD: '+',
  EQUALS: '=',
  DECIMAL: '.',
  ZERO: '0',
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
};

/**
 * @param {number} number
 * @returns {string}
 */
function setPrecision10(number) {
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

/**
 * @param {{expression: string, input: string, status: string}} state
 * @returns {{expression: string, input: string, status: string}}
 */
export function getResult(state) {
  let result;

  try {
    result = setPrecision10(calculate(state.expression));
  } catch (error) {
    result = error.message;
  }

  return {
    expression: state.expression,
    input: result,
    status: STATUS.RESULT,
  };
}
