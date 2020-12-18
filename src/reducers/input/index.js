/**
 * @param {string} input
 * @param {{ type: string, payload: string }} action
 * @return {string}
 */
export function inputReducer(input, action) {
  switch (action.type) {
    case 'operator-result':
    case 'operator-negative':
    case 'operator-operator-negate':
    case 'operator-operator':
    case 'operator-default':
    case 'digit-result':
    case 'digit-operator':
    case 'digit-default-zero':
    case 'delete':
      return action.payload;
    case 'digit-negative':
    case 'digit-default':
      return input + action.payload;
    default:
      return input;
  }
}
