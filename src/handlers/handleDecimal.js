import handleDigit from './handleDigit';

function handleDecimal(state, decimal) {
  const { input } = state;
  const isResult = state.status === 'RESULT';

  if (input.includes(decimal) && !isResult) return state;

  return input === '0' || state.status
    ? handleDigit(state, '0' + decimal)
    : handleDigit(state, decimal);
}

export default handleDecimal;
