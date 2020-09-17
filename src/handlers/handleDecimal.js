import handleDigit from './handleDigit';

function handleDecimal(state, decimal) {
  const { input } = state;
  const isResult = state.status === 'RESULT';
  const isNegative = state.status === 'NEGATIVE';
  const isOperator = state.status === 'OPERATOR';

  if (input.includes(decimal) && !isResult) return state;

  return input === '0' || isResult || isNegative || isOperator
    ? handleDigit(state, '0' + decimal)
    : handleDigit(state, decimal);
}

export default handleDecimal;
