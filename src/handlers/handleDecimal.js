import handleDigit from './handleDigit';

function handleDecimal(state, decimal) {
  const { input, isNegative, isOperator } = state;
  const isResult = state.status === 'RESULT';

  if (input.includes(decimal) && !isResult) return state;

  return input === '0' || isResult || isNegative || isOperator
    ? handleDigit(state, '0' + decimal)
    : handleDigit(state, decimal);
}

export default handleDecimal;
